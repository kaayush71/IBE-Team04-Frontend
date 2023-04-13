import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
}

const initialState: CheckOutPageConfig = {
  travelerInfo: [],
  billingInfo: [],
  loading: true,
  formToShow: "travelerInfo",
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

export const checkoutConfigDataSlice = createSlice({
  name: "checkoutConfig",
  initialState,
  reducers: {
    setFormToShow: (state, action) => {
      state.formToShow = action.payload;
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
  },
});

export const { setFormToShow } = checkoutConfigDataSlice.actions;
export default checkoutConfigDataSlice.reducer;
