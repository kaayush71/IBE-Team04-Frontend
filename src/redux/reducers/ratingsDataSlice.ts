import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Ratings } from "../../constants/types";

interface RootState {
  ratings: Ratings[];
  getRatingsStatus: string;
}

const initialState: RootState = {
  ratings: [],
  getRatingsStatus: "",
};

export const fetchAllRatings = createAsyncThunk("fetchAllRatins", async (req: any, thunkAPI) => {
  const response = await axios.get(
    "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/getAllReview",
    {
      params: req,
    }
  );
  console.log("ratings", response.data);
  return response.data;
});

export const ratingsDataSlice = createSlice({
  name: "ratingsDataSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllRatings.pending, (state) => {
      state.getRatingsStatus = "";
    });
    builder.addCase(fetchAllRatings.fulfilled, (state, action) => {
      state.getRatingsStatus = "success";
      state.ratings = action.payload;
    });
  },
});

export default ratingsDataSlice.reducer;
