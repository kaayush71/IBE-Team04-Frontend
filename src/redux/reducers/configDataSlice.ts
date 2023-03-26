import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface State {
  applicationTitle: string;
  companyLogo: {
    headerLogo: string;
    footerLogo: string;
  };
  companyTitle: string;
  licenseText: string;
}

const initialState: State = {
  applicationTitle: "",
  companyLogo: {
    headerLogo: "",
    footerLogo: "",
  },
  companyTitle: "",
  licenseText: "",
};

// fetching the company details configurable
// data from the api gateway which is invoking
// a lambda and getting the data from dynamodb
export const fetchStaticCompanyData = createAsyncThunk(
  "companyData/fetchCompnayData",
  async (req, thunkApi) => {
    const respone = await axios.get(
      "https://ag7cd1h6xc.execute-api.ap-south-1.amazonaws.com/development/companydetails?tenantName=Kickdrum&propertyConfiguration=Team-04%23companyDetails#companyDetails"
    );
    return JSON.parse(respone.data.Item.companyDetails);
  }
);

export const configDataSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStaticCompanyData.fulfilled, (state, action) => {
      state.applicationTitle = action.payload.applicationTitle;
      state.companyLogo = action.payload.companyLogo;
      state.companyTitle = action.payload.companyTitle;
      state.licenseText = action.payload.licenseText;
      console.log("company config data", action.payload);
    });
  },
});

export default configDataSlice.reducer;
