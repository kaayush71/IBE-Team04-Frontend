import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial State interface
interface State {
  applicationTitle: string;
  companyLogo: {
    headerLogo: string;
    footerLogo: string;
  };
  companyTitle: string;
  licenseText: string;
  bannerImage: string;
  properties: {
    availaibleProperties: string[];
  };
}

// Define the initial state of the Redux store
const initialState: State = {
  applicationTitle: "",
  companyLogo: {
    headerLogo: "",
    footerLogo: "",
  },
  companyTitle: "",
  licenseText: "",
  bannerImage: "",
  properties: {
    availaibleProperties: [],
  },
};

// Create an asynch thunk function
export const fetchStaticCompanyData = createAsyncThunk(
  "companyData/fetchCompnayData", 
  async (req, thunkApi) => {
    // Make an API request using Axios to fetch company details
    const respone = await axios.get(
      "https://ag7cd1h6xc.execute-api.ap-south-1.amazonaws.com/development/companydetails?tenantName=Kickdrum&propertyConfiguration=Team-04%23companyDetails#companyDetails"
    );
    // Parse the response data and return it
    return JSON.parse(respone.data.Item.companyDetails);
  }
);

export const configDataSlice = createSlice({
  name: "config", // Name of the slice
  initialState, // Initial state of the slice
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(fetchStaticCompanyData.fulfilled, (state, action) => {
      // Update the state with the fetched data
      state.applicationTitle = action.payload.applicationTitle;
      state.companyLogo = action.payload.companyLogo;
      state.companyTitle = action.payload.companyTitle;
      state.licenseText = action.payload.licenseText;
      state.bannerImage = action.payload.bannerImage;
      state.properties = action.payload.properties;
    });
    builder.addCase(fetchStaticCompanyData.rejected, () => {
      // Log the rejection to the console
      console.log("rejected");
    });
  },
});

// Export the reducer from the slice
export default configDataSlice.reducer;
