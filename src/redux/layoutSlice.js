import { createSlice } from "@reduxjs/toolkit";
import { STATUS_INFO } from "../shared/constants/status";

const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    toasterVisible: false,
    toasterMessage: null,
    toasterStatus: STATUS_INFO,
    isLoading: false,
    alertContinue: false,
    alertData: null,
    isAlertOpen: false,
    alertMessage: null,
    alertTitle: null,
  },

  reducers: {
    cancelAlert: (state) => {
      state.isAlertOpen = false;
      state.alertContinue = false;
      state.alertData = null;
    },
    continueAlert: (state) => {
      state.alertContinue = true;
      state.isAlertOpen = false;
    },
    showAlert: (state, action) => {
      state.isAlertOpen = true;
      state.alertData = action.payload?.alertData;
      state.alertMessage = action.payload?.message;
      state.alertTitle = action.payload?.title;
    },
    hideLoader: (state) => {
      state.isLoading = false;
      state.loadingMessage = null;
    },
    showLoader: (state, action) => {
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
