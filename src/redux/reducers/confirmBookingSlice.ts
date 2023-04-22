import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Booking } from "../../constants/types";
import axios from "axios";

interface InitialState {
  booking: Booking;
  allBookings: Booking[];
  loading: boolean;
  getBookingStatus: string;
  openAllAccordion: boolean;
  roomTotalSummary: boolean;
  guestInfo: boolean;
  billingAddress: boolean;
  paymentInfo: boolean;
  sendOtpMailStatus: string;
  verifyOtpMailStatus: string;
  deleteForLoginUserStatus: string;
  confirmBookingMailStatus: string;
  getAllBookingStatus: string;
}

const initialState: InitialState = {
  booking: {
    bookingId: 0,
    checkInDate: "",
    checkOutDate: "",
    roomTypeId: 0,
    roomTypeName: "",
    nightlyRate: 0,
    subTotal: 0,
    propertyId: 0,
    customPromotion:
      {
        minimumDaysOfStay: 0,
        priceFactor: 0,
        promotionDescription: "",
        promotionTitle: "",
        isDeactivated: false,
        promotionId: 0,
      } || null,
    graphQlPromotion:
      {
        minimumDaysOfStay: 0,
        priceFactor: 0,
        promotionDescription: "",
        promotionTitle: "",
        isDeactivated: false,
        promotionId: 0,
      } || null,
    roomsCount: 0,
    totalCostOfStay: 0,
    travellerEmail: "",
    travellerFirstName: "",
    travellerLastName: "",
    travellerPhoneNumber: "",
    billingFirstName: "",
    billingLastName: "",
    billingPhoneNumber: "",
    billingEmail: "",
    billingMailingAddress1: "",
    billingMailingAddress2: "",
    billingCity: "",
    billingState: "",
    billingCountry: "",
    billingZip: "",
    cardNumber: "",
    cardNumberExpiryMonth: "",
    cardNumberExpiryYear: "",
    bedsCount: 0,
    adultCount: 0,
    childCount: 0,
    teenCount: 0,
    isSendOffers: true,
    isCancelled:false,
    tax: 0,
    vat: 0,
  },
  allBookings: [],
  loading: true,
  getBookingStatus: "",
  openAllAccordion: false,
  roomTotalSummary: false,
  guestInfo: false,
  billingAddress: false,
  paymentInfo: false,
  sendOtpMailStatus: "",
  verifyOtpMailStatus: "",
  deleteForLoginUserStatus: "",
  confirmBookingMailStatus: "",
  getAllBookingStatus: "",
};

export const getAllBookingData = createAsyncThunk(
  "getAllBookingData",
  async (req: any, thunkAPI) => {
    const response = await axios.get(
      "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/getAllBooking",
      {
        params: {
          billingEmailAddress: req,
        },
      }
    );
    console.log(response.data);
    return response.data;
  }
);

export const getBookingData = createAsyncThunk("getBookingData", async (req: any, thunkAPI) => {
  console.log("getBookingData", req);
  const response = await axios.get(
    `https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/booking/${req}`
  );
  console.log("get booking response", response.data);
  return response.data;
});

export const sendOtpMail = createAsyncThunk("sendOtpMail", async (req: any, thunkAPI) => {
  console.log(req);
  const response = await axios.post(
    `https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/booking/${req.bookingId}`,
    req
  );
  return response.data;
});

export const verifyOtpMail = createAsyncThunk("verifyOtp", async (req: any, thunkAPI) => {
  console.log("verifyOtp Mail", req);
  const response = await axios.post(
    `https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/delBooking/${req.bookingId}`,
    {},
    {
      params: {
        Otp: req.Otp,
      },
    }
  );
  console.log(response.data);
  return response.data;
});

export const deleteForLoginUser = createAsyncThunk(
  "deleteForLoginUser",
  async (req: any, thunkAPI) => {
    console.log("delete for login user", req);
    const response = await axios.post(
      `https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/delBookingForLogin/${req.bookingId}`,
      req
    );
    return response.data;
  }
);

export const sendConfirmBookingMail = createAsyncThunk(
  "sendConfirmBookingMail",
  async (req: any, thunkAPI) => {
    console.log(req);
    const response = await axios.get(
      `https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/email/${req}`
    );
    console.log("sendConfirmBookingMail response", response.data);
    return response.data;
  }
);

export const confirmBookingSlice = createSlice({
  name: "confirmBooking", // name of the slice
  initialState, // initial state object
  reducers: {
    setOpenAllAccordion: (state, action) => {
      state.openAllAccordion = action.payload;
    },
    setRoomTotalSummary: (state, action) => {
      state.roomTotalSummary = action.payload;
    },
    setGuestInfo: (state, action) => {
      state.guestInfo = action.payload;
    },
    setBillingAddress: (state, action) => {
      state.billingAddress = action.payload;
    },
    setPaymentInformation: (state, action) => {
      state.paymentInfo = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getBookingData.pending, (state) => {
      state.loading = true;
      state.getBookingStatus = "";
    });
    builder.addCase(getBookingData.fulfilled, (state, action) => {
      state.booking = action.payload;
      state.loading = false;
      state.getBookingStatus = "success";
    });
    builder.addCase(getBookingData.rejected, (state) => {
      state.loading = false;
      state.getBookingStatus = "rejected";
    });
    builder.addCase(sendOtpMail.pending, (state) => {
      state.sendOtpMailStatus = "";
    });
    builder.addCase(sendOtpMail.fulfilled, (state, action) => {
      state.sendOtpMailStatus = "success";
    });
    builder.addCase(sendOtpMail.rejected, (state) => {
      state.sendOtpMailStatus = "rejected";
    });
    builder.addCase(verifyOtpMail.pending, (state) => {
      state.verifyOtpMailStatus = "";
    });
    builder.addCase(verifyOtpMail.fulfilled, (state, action) => {
      state.verifyOtpMailStatus = "success";
    });
    builder.addCase(verifyOtpMail.rejected, (state) => {
      console.log("verify otp status rejected");
      state.verifyOtpMailStatus = "rejected";
    });
    builder.addCase(deleteForLoginUser.pending, (state) => {
      state.deleteForLoginUserStatus = "";
    });
    builder.addCase(deleteForLoginUser.fulfilled, (state, action) => {
      state.deleteForLoginUserStatus = "success";
    });
    builder.addCase(deleteForLoginUser.rejected, (state) => {
      console.log("verify otp status rejected");
      state.deleteForLoginUserStatus = "rejected";
    });
    builder.addCase(sendConfirmBookingMail.pending, (state) => {
      state.confirmBookingMailStatus = "";
    });
    builder.addCase(sendConfirmBookingMail.fulfilled, (state, action) => {
      state.confirmBookingMailStatus = "success";
    });
    builder.addCase(sendConfirmBookingMail.rejected, (state) => {
      console.log("verify otp status rejected");
      state.confirmBookingMailStatus = "rejected";
    });
    builder.addCase(getAllBookingData.pending, (state) => {
      state.getAllBookingStatus = "";
    });
    builder.addCase(getAllBookingData.fulfilled, (state, action) => {
      state.getAllBookingStatus = "success";
      state.allBookings = action.payload;
    });
    builder.addCase(getAllBookingData.rejected, (state) => {
      console.log("verify otp status rejected");
      state.getAllBookingStatus = "rejected";
    });
  },
});

export default confirmBookingSlice.reducer;
export const {
  setOpenAllAccordion,
  setRoomTotalSummary,
  setGuestInfo,
  setBillingAddress,
  setPaymentInformation,
} = confirmBookingSlice.actions;
