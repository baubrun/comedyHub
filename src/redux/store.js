import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./layoutSlice";
import eventsReducer from "./eventsSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    events: eventsReducer,
    layout: layoutReducer,
  },
});
