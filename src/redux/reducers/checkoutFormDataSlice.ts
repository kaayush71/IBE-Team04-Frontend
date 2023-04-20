import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface TravellerInfo {
  travellerFirstName: string;
  travellerLastName: string;
  travellerPhoneNumber: string;
  travellerEmail: string;
}

interface BillingInfo {
  billingFirstName: string;
  billingLastName: string;
  billingPhoneNumber: string;
  billingEmail: string;
  billingCountry: string;
  billingState: string;
  billingCity: string;
  billingZip: string;
  billingMailingAddress1: string;
  billingMailingAddress2: string;
}

interface PaymentFormInfo {
  cardNumber: string;
  cardNumberExpiryMonth: string;
  cardNumberExpiryYear: string;
}

interface CheckOutPageConfig {
  travelerInfo: {
    fieldName: string;
    show: boolean;
    inputName: string;
  }[][];
  billingInfo: {
    fieldName: string;
    show: boolean;
    inputName: string;
  }[][];
  loading: boolean;
  formToShow: string;
  travellerFormInfo: TravellerInfo;
  billingFormInfo: BillingInfo;
  paymentFormInfo: PaymentFormInfo;
  makeBookingStatus: string;
  bookingId: string;
}

const initialState: CheckOutPageConfig = {
  travelerInfo: [],
  billingInfo: [],
  loading: true,
  formToShow: "travelerInfo",
  travellerFormInfo: {
    travellerFirstName: "",
    travellerLastName: "",
    travellerPhoneNumber: "",
    travellerEmail: "",
  },
  billingFormInfo: {
    billingFirstName: "",
    billingLastName: "",
    billingPhoneNumber: "",
    billingEmail: "",
    billingCountry: "",
    billingState: "",
    billingCity: "",
    billingZip: "",
    billingMailingAddress1: "",
    billingMailingAddress2: "",
  },
  paymentFormInfo: {
    cardNumber: "",
    cardNumberExpiryMonth: "",
    cardNumberExpiryYear: "",
  },
  makeBookingStatus: "",
  bookingId: "",
};

export const fetchCheckoutConfig = createAsyncThunk(
  "fetchCheckoutConfig",
  async (req, thunkAPI) => {
    const response = await axios.get(
      "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/configuration?tenantName=Kickdrum&property=Team-04%23checkoutConfig"
    );
    return JSON.parse(response.data.checkoutConfig);
  }
);

// ------------------------------------------------------ make booking ----------------------------------------------
export const makeBooking = createAsyncThunk("makeBooking", async (req: any, thunkAPI) => {
  const response = await axios.post(
    "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/booking",
    req,
    {
      params: {
        startDate: `"${req.checkInDate}T00:00:00Z"`,
        endDate: `"${req.checkOutDate}T00:00:00Z"`,
      },
    }
  );
  console.log(response.data);
  return response.data;
});

export const checkoutConfigDataSlice = createSlice({
  name: "checkoutConfig",
  initialState,
  reducers: {
    setFormToShow: (state, action) => {
      state.formToShow = action.payload;
    },
    setBillingInfo: (state, action) => {
      state.billingFormInfo = action.payload;
    },
    setTravellerInfo: (state, action) => {
      state.travellerFormInfo = action.payload;
    },
    setPaymentInfo: (state, action) => {
      console.log("Payment info in slice", action.payload);
    },
    setMakeBookingStatus: (state) => {
      state.makeBookingStatus = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCheckoutConfig.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCheckoutConfig.fulfilled, (state, action) => {
      state.billingInfo = action.payload.checkOutPageConfig.billingInfo;
      state.travelerInfo = action.payload.checkOutPageConfig.travelerInfo;
      state.loading = false;
    });
    builder.addCase(makeBooking.pending, (state, action) => {
      state.makeBookingStatus = "";
      state.bookingId = "";
    });
    builder.addCase(makeBooking.fulfilled, (state, action) => {
      state.makeBookingStatus = "success";
      state.bookingId = action.payload.bookingId;
    });
    builder.addCase(makeBooking.rejected, (state, action) => {
      console.log("booking failed");
      state.makeBookingStatus = "rejected";
      state.bookingId = "";
    });
  },
});

export const { setFormToShow, setBillingInfo, setTravellerInfo, setPaymentInfo,setMakeBookingStatus } =
  checkoutConfigDataSlice.actions;
export default checkoutConfigDataSlice.reducer;
