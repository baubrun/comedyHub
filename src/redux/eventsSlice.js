import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "./layoutSlice";
import eventService from "../services/events";

export const getEvents = createAsyncThunk(
  "/events/getEvents",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const data = await eventService.getEvents();
      return data;
    } catch (error) {
      thunkApi.dispatch(hideLoader());
      return thunkApi.rejectWithValue(error?.response?.data);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  }
);

export const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
  },
  reducers: {},
  extraReducers: {
    [getEvents.fulfilled]: (state, action) => {
      state.events = action?.payload?.events;
    },
  },
});

export const eventsState = (state) => state.events;
export default eventSlice.reducer;
