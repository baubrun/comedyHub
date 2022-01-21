import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../shared/helpers";
import orderId from "order-id";

export const processPayment = createAsyncThunk("/processPmt", async (data) => {
  try {
    const res = await axios.post(baseUrl + "/processPmt", data);
    return res.data;
  } catch (error) {
    return {
      error: error.message,
    };
  }
});

export const createPurchase = createAsyncThunk("/purchase", async (data) => {
  try {
    const res = await axios.post(baseUrl + "/purchase", data);
    return res.data;
  } catch (error) {
    return {
      error: error.message,
    };
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    amount: 0,
    total: 0,
    loading: false,
    payErrorMsg: "",
    paySuccess: false,
    purchaseCreated: false,
    orderNumber: "",
    receipt: {
      items: [],
      total: null,
      orderNumber: "",
    },
  },
  reducers: {
    addToCart: (state, action) => {
      const found = state.items.findIndex((i) => i._id === action.payload._id);
      if (found === -1) {
        state.items = [...state.items, action.payload];
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.amount = 0;
      state.total = 0;
      state.loading = false;
      state.payErrorMsg = "";
      state.paySuccess = false;
      state.purchaseCreated = false;
      state.orderNumber = "";
    },
    receipt: (state) => {
      state.receipt.items = state.items;
      state.receipt.orderNumber = state.orderNumber;
      state.receipt.total = state.total;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    },
    getTotal: (state) => {
      let { total, amount } = state.items.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemsTotal = price * amount;

          cartTotal.amount += amount;
          cartTotal.total += itemsTotal;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      state.total = total;
      state.amount = amount;
    },
    toggleAmount: (state, action) => {
      state.items = state.items.map((item) => {
        if (item._id === action.payload._id) {
          if (action.payload.toggle === "inc") {
            return {
              ...item,
              amount: item.amount + 1,
            };
          } else {
            return {
              ...item,
              amount: item.amount - 1,
            };
          }
        }
        return item;
      });
    },
    setOrderNumber: (state) => {
      state.orderNumber = orderId("MY-SECRET").generate();
    },
  },
  extraReducers: {
    [createPurchase.fulfilled]: (state, action) => {
      state.loading = false;
      const { error } = action.payload;
      if (error) {
        state.payErrorMsg = error;
      } else {
        state.purchaseCreated = true;
      }
    },
    [createPurchase.rejected]: (state, action) => {
      state.loading = false;
      state.payErrorMsg = action.error;
    },

    [processPayment.pending]: (state) => {
      state.loading = true;
    },
    [processPayment.fulfilled]: (state, action) => {
      state.loading = false;
      const { error } = action.payload;
      if (error) {
        state.payErrorMsg = error;
      } else {
        state.paySuccess = true;
      }
    },
    [processPayment.rejected]: (state, action) => {
      state.loading = false;
      state.payErrorMsg = action.error;
    },
  },
});

export const {
  addToCart,
  clearCart,
  removeItem,
  getTotal,
  receipt,
  toggleAmount,
  setOrderNumber,
} = cartSlice.actions;

export const cartState = (state) => state.cart;
export default cartSlice.reducer;
