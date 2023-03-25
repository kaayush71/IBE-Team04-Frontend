import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface LandingConfig {
  bannerImage: string;
  searchForm: {
    properties: {
      availaibleProperties: string[];
    };
    bookingDateRange: number;
    rooms: {
      defaultRoomCount: number;
      roomCountArray: number[];
      maximumRoomOccupancy: number;
      showRoom: boolean;
    };
    guest: {
      showGuest: boolean;
      guestTypes: {
        categoryName: string;
        ageRange: string;
        show: boolean;
        count: number;
        minCount: number;
      }[];
    };
    accessibility: {
      showAccessibility: boolean;
      defaultAccessibilty: boolean;
    };
  };
}

interface State {
  showSearchForm: boolean;
  startDate: string;
  endDate: string;
  showDateOnForm: boolean;
  maxBookingDuration: number;
  numberOfRoomSelected: number;
  propertyId: string;
  landingConfig: LandingConfig;
  loading: boolean;
  totalGuestCount: number;
  accessibility: boolean;
  minimumNightlyPrice: number;
}

const initialState: State = {
  showSearchForm: false,
  startDate: new Date().toDateString(),
  endDate: new Date().toDateString(),
  showDateOnForm: false,
  maxBookingDuration: 14,
  numberOfRoomSelected: 0,
  propertyId: "",
  landingConfig: {
    bannerImage: "",
    searchForm: {
      properties: {
        availaibleProperties: [],
      },
      bookingDateRange: 14,
      rooms: {
        defaultRoomCount: 1,
        roomCountArray: [],
        maximumRoomOccupancy: 4,
        showRoom: true,
      },
      guest: {
        showGuest: true,
        guestTypes: [],
      },
      accessibility: {
        showAccessibility: true,
        defaultAccessibilty: true,
      },
    },
  },
  loading: true,
  totalGuestCount: 1,
  accessibility: true,
  minimumNightlyPrice: Infinity,
};

export const fetchLandingConfigData = createAsyncThunk(
  "fetchLandingConfig",
  async (req, thunkApi) => {
    const response = await axios.get(
      "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/configuration?tenantName=Kickdrum&property=Team-04%23landingPage"
    );
    console.log("landing config data", JSON.parse(response.data.landingPage));
    return JSON.parse(response.data.landingPage);
  }
);

export const landingSearchFormSlice = createSlice({
  name: "landingSearchForm",
  initialState,
  reducers: {
    setShowSearchForm: (state, action) => {
      state.showSearchForm = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setShowDateOnForm: (state, action) => {
      state.showDateOnForm = action.payload;
    },
    setPropertyId: (state, action) => {
      state.propertyId = action.payload;
    },
    setSelectedRoom: (state, action) => {
      state.numberOfRoomSelected = action.payload;
    },
    setAccessibility: (state, action) => {
      state.accessibility = action.payload;
    },
    setMinimumNightlyPrice: (state, action) => {
      state.minimumNightlyPrice = action.payload;
    },
    increaseGuestCount: (state, action) => {
      const guestType = state.landingConfig.searchForm.guest.guestTypes.find(
        (guest) => guest.categoryName === action.payload.categoryName
      );
      if (guestType !== undefined) {
        if (
          state.totalGuestCount <
          state.numberOfRoomSelected * state.landingConfig.searchForm.rooms.maximumRoomOccupancy
        ) {
          guestType.count += 1;
          state.totalGuestCount += 1;
        } else {
          return;
        }
      }
    },
    decreaseGuestCount: (state, action) => {
      const guestType = state.landingConfig.searchForm.guest.guestTypes.find(
        (guest) => guest.categoryName === action.payload.categoryName
      );
      if (guestType !== undefined) {
        if (guestType.count > guestType.minCount) {
          guestType.count -= 1;
          state.totalGuestCount -= 1;
        } else {
          return;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLandingConfigData.fulfilled, (state, action) => {
      state.landingConfig = action.payload;
      state.numberOfRoomSelected = action.payload.searchForm.rooms.defaultRoomCount;
      state.accessibility = action.payload.searchForm.accessibility.defaultAccessibilty;
      state.loading = false;
    });
  },
});

export default landingSearchFormSlice.reducer;
export const {
  setShowSearchForm,
  setStartDate,
  setEndDate,
  setShowDateOnForm,
  setPropertyId,
  setSelectedRoom,
  increaseGuestCount,
  decreaseGuestCount,
  setAccessibility,
  setMinimumNightlyPrice,
} = landingSearchFormSlice.actions;
