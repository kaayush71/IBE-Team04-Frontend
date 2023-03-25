import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface DataState {
  [date: string]: number;
}

interface State {
  data: DataState;
}

const initialState: State = {
  data: {},
};

export const fetchCalendarData = createAsyncThunk(
  "calendarData/fetchCalendarData",
  async (req, thunkApi) => {
    const respone = await axios.get(
      "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/graphql?propertyId=4"
    );
    return respone.data;
  }
);

export const calendarDataSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCalendarData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default calendarDataSlice.reducer;
