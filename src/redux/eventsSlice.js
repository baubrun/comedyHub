import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "./layoutSlice";
import eventService from "../components/services/events";

export const getEvents = createAsyncThunk(
  "/events/getEvents",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      // const { data } = await axios.get(`${baseUrl}/events`);
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

// export const patchEvent = createAsyncThunk(
//   "/events/put",
//   async (event, thunkApi) => {
//     try {
//       thunkApi.dispatch(showLoader());
//       const { data } = await axios.patch(
//         `${baseUrl}/events/${event[0]}`,
//         event[1]
//       );
//       return data;
//     } catch (error) {
//       thunkApi.dispatch(hideLoader());
//       return thunkApi.rejectWithValue(error?.response?.data);
//     } finally {
//       thunkApi.dispatch(hideLoader());
//     }
//   }
// );

// export const postEvent = createAsyncThunk(
//   "/events/post",
//   async (_, thunkApi) => {
//     try {
//       thunkApi.dispatch(showLoader());
//       const { data } = await axios.post(`${baseUrl}/events`);
//       return data;
//     } catch (error) {
//       thunkApi.dispatch(hideLoader());
//       return thunkApi.rejectWithValue(error?.response?.data);
//     } finally {
//       thunkApi.dispatch(hideLoader());
//     }
//   }
// );

export const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
  },
  reducers: {
    filterEvents: (state, action) => {
      state.events = state.events.filter((e) => e._id !== action.payload?.id);
    },
  },
  extraReducers: {
    // [postEvent.fulfilled]: (state, action) => {
    //   console.log("action.payload :>> ", action.payload);
    // },

    // [deleteEvent.fulfilled]: (state, action) => {
    //   console.log("action.payload :>> ", action.payload);
    // },

    [getEvents.fulfilled]: (state, action) => {
      state.events = action?.payload?.events;
    },
    // [patchEvent.fulfilled]: (state, action) => {
    //   console.log("action.payload :>> ", action.payload);
    // },
  },
});

export const { filterEvents } = eventSlice.actions;

export const eventsState = (state) => state.events;
export default eventSlice.reducer;
