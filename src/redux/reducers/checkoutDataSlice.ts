import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialRoom, Promotion, RoomTypeRate } from "../../constants/types";
import axios from "axios";
// importing RoomType interface from a different module
import { RoomType } from "./roomResultConfigDataSlice";

// defining the Checkout interface
interface Checkout {
  room: RoomType; // a RoomType object containing information about the selected room
  showItineraryCard: boolean; // a boolean flag indicating whether to show the itinerary card or not
  selectedPromotion: Promotion;
  guestTypes: {
    categoryName: string;
    ageRange: string;
    show: boolean;
    count: number;
    minCount: number;
  }[];
  startDate: string;
  endDate: string;
  selectedRoom: number;
  vat: number;
  dueNow: number;
  dueAtResort: number;
  taxes: {
    name: string;
    value: number;
  }[];
  sendReviewMailStatus: string;
  addReviewStatus: string;
  userId: string;
  roomTypeRates: RoomTypeRate[];
  totalCostOfStay: number;
  ratingAdded: boolean;
}

// defining the initial state of the Checkout object
const initialState: Checkout = {
  room: initialRoom,
  selectedPromotion: {
    minimumDaysOfStay: NaN,
    priceFactor: NaN,
    promotionDescription: "",
    promotionTitle: "",
    isDeactivated: false,
    promotionId: NaN,
  },
  showItineraryCard: false,
  guestTypes: [],
  startDate: "",
  endDate: "",
  selectedRoom: 0,
  vat: 0,
  dueAtResort: 0,
  dueNow: 0,
  taxes: [],
  sendReviewMailStatus: "",
  addReviewStatus: "",
  userId: "",
  roomTypeRates: [],
  totalCostOfStay: NaN,
  ratingAdded: false,
};

export const fetchBillingConfig = createAsyncThunk("fetchBillingConfig", async (req, thunkAPI) => {
  const response = await axios.get(
    "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/configuration?tenantName=Kickdrum&property=Team-04%23billingConfig"
  );
  console.log(JSON.parse(response.data.billingConfig));
  return JSON.parse(response.data.billingConfig);
});

export const checkRatingAdded = createAsyncThunk("checkRatingAdded", async (req: any, thunkAPI) => {
  const response = await axios.get(
    "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/checkReview",
    {
      params: {
        ratingId: req.ratingId,
      },
    }
  );
  return response.data;
});

export const sendReviewMail = createAsyncThunk("sendReviewMail", async (req: any, thunkAPI) => {
  console.log("req", req);
  const response = await axios.get(
    "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/feedback",
    {
      params: req,
    }
  );
  console.log(response.data);
  return response.data;
});

export const addReview = createAsyncThunk("addReview", async (req: any, thunkAPI) => {
  console.log("req", req);
  const response = await axios.post(
    "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/addReviews",
    {},
    { params: req }
  );
  console.log(response.data);
  return response.data;
});

export const fetchRoomTypeRates = createAsyncThunk(
  "fetchRoomTypeRates",
  async (req: any, thunkAPI) => {
    const response = await axios.get(
      "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/graphql/getRoomTypeRates/4",
      {
        params: {
          startTime: `"${req.startTime}T00:00:00Z"`,
          endTime: `"${req.endTime}T00:00:00Z"`,
          roomTypeId: req.roomTypeId,
        },
      }
    );
    return response.data;
  }
);

// creating the checkoutDataSlice using createSlice method
export const checkoutDataSlice = createSlice({
  name: "checkoutDataSlice", // name of the slice
  initialState, // initial state object
  reducers: {
    // reducer to set the selected room in the state
    setCheckoutRoom: (state, action) => {
      state.room = action.payload; // update the room object in the state with the payload data
    },
    // reducer to toggle the showItineraryCard flag in the state
    setShowItineraryCard: (state, action) => {
      state.showItineraryCard = action.payload; // update the showItineraryCard flag with the payload data
    },
    setSelectedPromotion: (state, action) => {
      state.selectedPromotion = action.payload;
    },
    setSelectedGuestType: (state, action) => {
      state.guestTypes = action.payload;
    },
    setDates: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    setCheckoutSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBillingConfig.fulfilled, (state, action) => {
      state.vat = action.payload.vat;
      state.taxes = action.payload.taxes;
      state.dueNow = action.payload.dueNow;
      state.dueAtResort = action.payload.dueAtResort;
    });
    builder.addCase(checkRatingAdded.pending, (state) => {
      state.ratingAdded = false;
    });
    builder.addCase(checkRatingAdded.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload.message === "Rating yet to be filled") {
        state.ratingAdded = false;
      } else state.ratingAdded = true;
    });
    builder.addCase(checkRatingAdded.rejected, (state) => {
      state.ratingAdded = true;
    });

    builder.addCase(sendReviewMail.pending, (state) => {
      state.sendReviewMailStatus = "";
    });
    builder.addCase(sendReviewMail.fulfilled, (state, action) => {
      state.sendReviewMailStatus = "success";
    });
    builder.addCase(sendReviewMail.rejected, (state) => {
      state.sendReviewMailStatus = "rejected";
    });
    builder.addCase(addReview.pending, (state) => {
      state.addReviewStatus = "";
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.addReviewStatus = "success";
    });
    builder.addCase(addReview.rejected, (state) => {
      state.addReviewStatus = "rejected";
    });
    builder.addCase(fetchRoomTypeRates.fulfilled, (state, action) => {
      console.log("room type rates", action.payload);
      state.roomTypeRates = action.payload;
      let totalCost = 0;
      for (let i = 0; i < state.roomTypeRates.length; i++) {
        totalCost += state.roomTypeRates[i].roomTypeRate;
      }
      state.totalCostOfStay = totalCost;
    });
  },
});

// exporting the actions generated by the slice
export const {
  setShowItineraryCard,
  setCheckoutRoom,
  setSelectedPromotion,
  setSelectedGuestType,
  setDates,
  setCheckoutSelectedRoom,
  setUserId,
} = checkoutDataSlice.actions;

// exporting the reducer function generated by the slice
export default checkoutDataSlice.reducer;
