import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { promotionSliceIntialState } from "../../constants/types";

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

export const fetchPromotions = createAsyncThunk(
  "promotionData/fetchPromotionData",
  async (req: any, thunkApi) => {
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

export const fetchCustomPromotion = createAsyncThunk(
  "customPromotion/fetchCustomPromotion",
  async (req: any, thunkApi) => {
    console.log("prmotion", req);
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

export const promotionDataSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {
    setSelectedPromotionRoomType: (state, action) => {
      state.selectedPromotionRoomType = action.payload;
    },
    setFetchPromotionStatus: (state, action) => {
      state.fetchCustomPromoStatus = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPromotions.fulfilled, (state, action) => {
      state.promotions = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPromotions.rejected, (state) => {
      state.loading = false;
      throw new Error("Unable to fetch promotions");
    });
    builder.addCase(fetchCustomPromotion.pending, (state) => {
      state.fetchCustomPromoStatus = "";
    });
    builder.addCase(fetchCustomPromotion.fulfilled, (state, action) => {
      state.specialPromotion.promotionId = action.payload.promotion;
      state.specialPromotion.promotionTitle = action.payload.promotionTitle;
      state.specialPromotion.promotionDescription = action.payload.promotionDescription;
      state.specialPromotion.priceFactor = action.payload.priceFactor;
      state.showSpecialPromotion = true;
      state.fetchCustomPromoStatus = "success";
    });
    builder.addCase(fetchCustomPromotion.rejected, (state, action) => {
      state.fetchCustomPromoStatus = "rejected";
    });
  },
});

export const { setSelectedPromotionRoomType, setFetchPromotionStatus } = promotionDataSlice.actions;
export default promotionDataSlice.reducer;
