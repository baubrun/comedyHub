import { createSlice } from "@reduxjs/toolkit";
import { STATUS_INFO } from "../shared/constants/status";

const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    toasterVisible: false,
    toasterMessage: null,
    toasterStatus: STATUS_INFO,
    isLoading: false,
  },

  reducers: {
    hideLoader: (state) => {
      state.isLoading = false;
      state.loadingMessage = null;
    },
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideToaster: (state) => {
      state.toasterVisible = false;
    },
    showToaster: (state, action) => {
      state.toasterVisible = true;
      state.toasterMessage = action.payload?.message;
      state.toasterStatus = action.payload?.status;
    },
  },
});

export const {
  cancelAlert,
  continueAlert,
  showAlert,
  hideLoader,
  showLoader,
  hideToaster,
  showToaster,
} = layoutSlice.actions;

export const layoutState = (state) => state.layout;

export default layoutSlice.reducer;
