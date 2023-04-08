// Import necessary functions and libraries
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { promotionSliceIntialState } from "../../constants/types";

// Define initial state for the promotion slice
const initialState: promotionSliceIntialState = {
  promotions: [],
  loading: true,
  specialPromotion: {
    minimumDaysOfStay: NaN,
    priceFactor: NaN,
    promotionDescription: "",
    promotionTitle: "",
    isDeactivated: false,
    promotionId: NaN,
  },
  showSpecialPromotion: false,
  isSpecialPromotionError: false,
  selectedPromotionRoomType: "",
  fetchCustomPromoStatus: "",
};

// Create an async thunk function to fetch promotions data from a backend API
export const fetchPromotions = createAsyncThunk(
  "promotionData/fetchPromotionData", // Name for the slice and the async thunk
  async (req: any, thunkApi) => {
    // Use Axios to make a GET request to the API endpoint and return the response data
    const response = await axios.get(
      "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/getAllPromotions/?",
      {
        params: {
          startDate: `"${req.startDate}T00:00:00Z"`,
          endDate: `"${req.endDate}T00:00:00Z"`,
        },
      }
    );
    return response.data;
  }
);

// Create another async thunk function to fetch custom promotions data from the same backend API
export const fetchCustomPromotion = createAsyncThunk(
  "customPromotion/fetchCustomPromotion", // Name for the slice and the async thunk
  async (req: any, thunkApi) => {
    // Use Axios to make a GET request to the API endpoint and return the response data
    const response = await axios.get(
      "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/checkCustomPromotions",
      {
        params: {
          roomTypeId: req.roomTypeId,
          promoCode: req.promoCode,
        },
      }
    );
    return response.data;
  }
);

// Create a slice of state for the promotion data
export const promotionDataSlice = createSlice({
  name: "promotions", // Name for the slice
  initialState, // Initial state defined above
  reducers: {
    setSelectedPromotionRoomType: (state, action) => {
      state.selectedPromotionRoomType = action.payload;
    },
    setFetchPromotionStatus: (state, action) => {
      state.fetchCustomPromoStatus = "";
    },
  },
  extraReducers(builder) {
    // Handle the successful completion of the fetchPromotions async thunk
    builder.addCase(fetchPromotions.fulfilled, (state, action) => {
      state.promotions = action.payload; // Update the promotions state with the response data
      state.loading = false; // Set loading state to false
    });
    // Handle the rejection of the fetchPromotions async thunk
    builder.addCase(fetchPromotions.rejected, (state) => {
      state.loading = false; // Set loading state to false
      throw new Error("Unable to fetch promotions"); // Throw an error for debugging purposes
    });
    // Handle the pending state of the fetchCustomPromotion async thunk
    builder.addCase(fetchCustomPromotion.pending, (state) => {
      state.fetchCustomPromoStatus = ""; // Set the fetchCustomPromoStatus state to an empty string
    });
  },
});
export const { setSelectedPromotionRoomType, setFetchPromotionStatus } = promotionDataSlice.actions;
export default promotionDataSlice.reducer;
