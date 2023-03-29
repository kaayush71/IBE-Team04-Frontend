import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addDays } from "date-fns";

interface LandingConfig {
  bannerImage: string;
  searchForm: {
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
  isLandingFormDisable: boolean;
}

const formData = JSON.parse(localStorage.getItem("formData") || "{}");
console.log("form-data", formData);

const initialState: State = {
  showSearchForm: false,
  startDate: new Date().toDateString(),
  endDate: addDays(new Date(), 2).toDateString(),
  showDateOnForm: false,
  maxBookingDuration: 14,
  numberOfRoomSelected: 1,
  propertyId: "",
  landingConfig: {
    bannerImage: "",
    searchForm: {
      bookingDateRange: 14,
      rooms: {
        defaultRoomCount: 1,
        roomCountArray: [1],
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
  isLandingFormDisable: localStorage.getItem("isLandingFormDisable") === "true" ? true : false,
};

export const fetchLandingConfigData = createAsyncThunk(
  "fetchLandingConfig",
  async (req, thunkApi) => {
    const response = await axios.get(
      "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/configuration?tenantName=Kickdrum&property=Team-04%23landingPage"
    );
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
      state.landingConfig.searchForm.rooms.defaultRoomCount = action.payload;
    },
    setAccessibility: (state, action) => {
      state.accessibility = action.payload;
    },
    setMinimumNightlyPrice: (state, action) => {
      state.minimumNightlyPrice = action.payload;
    },
    setIsLandingFormDisbale: (state, action) => {
      state.isLandingFormDisable = action.payload;
    },
    increaseGuestCount: (state, action) => {
      const maximumRoomOccupancy = state.landingConfig.searchForm.rooms.maximumRoomOccupancy;
      const roomCountArray = state.landingConfig.searchForm.rooms.roomCountArray;
      const maximumAvailaibleRoom = roomCountArray[roomCountArray.length - 1];
      if (state.totalGuestCount === maximumAvailaibleRoom * maximumRoomOccupancy) {
        return;
      }

      const guestType = state.landingConfig.searchForm.guest.guestTypes.find(
        (guest) => guest.categoryName === action.payload.categoryName
      );
      if (guestType !== undefined) {
        if (state.totalGuestCount < state.numberOfRoomSelected * maximumRoomOccupancy) {
          guestType.count += 1;
          state.totalGuestCount += 1;
        } else {
          guestType.count += 1;
          state.totalGuestCount += 1;
          state.numberOfRoomSelected += 1;
        }
      }
    },
    decreaseGuestCount: (state, action) => {
      const maximumRoomOccupancy = state.landingConfig.searchForm.rooms.maximumRoomOccupancy;
      const guestType = state.landingConfig.searchForm.guest.guestTypes.find(
        (guest) => guest.categoryName === action.payload.categoryName
      );
      if (guestType !== undefined) {
        if (guestType.count > guestType.minCount) {
          guestType.count -= 1;
          state.totalGuestCount -= 1;
          if (state.totalGuestCount % maximumRoomOccupancy === 0) {
            state.numberOfRoomSelected -= 1;
          }
        } else {
          return;
        }
      }
    },

    // update the state with localstorage data
    // for persistence data store.
    getLocalstorageFormData: (state) => {
      const formData = JSON.parse(localStorage.getItem("formData") || "{}");
      state.startDate = formData.startDate;
      state.numberOfRoomSelected = formData.rooms;
      state.landingConfig.searchForm.guest.guestTypes = formData.guestDetails;
      state.landingConfig.searchForm.rooms.defaultRoomCount = formData.defaultRoomCount;
      state.landingConfig.searchForm.rooms.roomCountArray = formData.roomCountArray;
      console.log("form-data", formData);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLandingConfigData.fulfilled, (state, action) => {
      state.landingConfig = action.payload;
      state.numberOfRoomSelected = action.payload.searchForm.rooms.defaultRoomCount;
      state.accessibility = action.payload.searchForm.accessibility.defaultAccessibilty;
      state.loading = false;
    });
    builder.addCase(fetchLandingConfigData.rejected, (state) => {
      state.loading = false;
      throw new Error("Unable to fetch the landing config data");
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
  setIsLandingFormDisbale,
  getLocalstorageFormData,
} = landingSearchFormSlice.actions;
