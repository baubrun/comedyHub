import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderId from "order-id";
import paymentService from "../services/payment";

export const createPayment = createAsyncThunk(
  "/payment",
  async (payment, thunkApi) => {
    try {
      const data = await paymentService.createPayment(payment);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    orderNumber: "",
    payPending: false,
    paySuccess: false,
    receipt: {
      items: [],
      total: null,
      orderNumber: "",
    },
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const found = state.items.findIndex((i) => i._id === action.payload._id);
      if (found === -1) {
        state.items = [...state.items, { ...action?.payload, quantity: 1 }];
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.loading = false;
      state.paySuccess = false;
      state.purchaseCreated = false;
      state.orderNumber = "";
    },
    createReceipt: (state) => {
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
      let { total, quantity } = state.items.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemsTotal = price * quantity;

          cartTotal.quantity += quantity;
          cartTotal.total += itemsTotal;
          return cartTotal;
        },
        {
          total: 0,
        }
      );
      state.total = total;
      state.quantity = quantity;
    },
    toggleAmount: (state, action) => {
      const foundIdx = state.items.findIndex(
        (i) => i._id === action.payload._id
      );
      if (foundIdx > -1) {
        if (action.payload.toggle === "inc") {
          state.items[foundIdx]["quantity"] += 1;
        } else {
          if (state.items[foundIdx]["quantity"] === 1) {
            state.items.splice(foundIdx, 1);
          } else {
            state.items[foundIdx]["quantity"] -= 1;
          }
        }
      }
    },
    setOrderNumber: (state) => {
      state.orderNumber = orderId("MY-SECRET").generate();
    },
  },
  extraReducers: {
    [createPayment.pending]: (state) => {
      state.payPending = true;
    },
    [createPayment.fulfilled]: (state, action) => {
      state.payPending = false;
      state.paySuccess = action?.payload?.success;
    },
  },
});

export const {
  addToCart,
  clearCart,
  removeItem,
  getTotal,
  createReceipt,
  toggleAmount,
  setOrderNumber,
} = cartSlice.actions;

export const cartState = (state) => state.cart;
export default cartSlice.reducer;
