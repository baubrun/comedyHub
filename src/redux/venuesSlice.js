import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "./layoutSlice";
import { baseUrl } from "../shared/helpers";

export const getVenues = createAsyncThunk("/venues", async (_, thunkApi) => {
  try {
    thunkApi.dispatch(showLoader());
    const { data } = await axios.get(`${baseUrl}/venues`);
    return data;
  } catch (error) {
    thunkApi.dispatch(hideLoader());
    return thunkApi.rejectWithValue(error?.response?.data);
  } finally {
    thunkApi.dispatch(hideLoader());
  }
});

export const venuesSlice = createSlice({
  name: "venues",
  initialState: {
    venues: [],
  },
  reducers: {},
  extraReducers: {
    [getVenues.fulfilled]: (state, action) => {
      state.venues = action?.payload?.venues;
    },
  },
});

export const venuesState = (state) => state.venues;
export default venuesSlice.reducer;
