import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { roomResultsConfigData } from "../../constants/types";

const initialState: roomResultsConfigData = {
  filters: {
    bedTypeFilter: {
      showBedFilter: true,
      bedFilterArrayOptions: [],
    },
    roomTypeFilter: {
      showRoomTypeFilter: true,
      roomTypeFilterArrayOptions: [],
    },
    numberOfBedsFilter: {
      showNumberOfBedFilter: true,
      numberOfBedsFilterOptions: [],
    },
    priceFilter: {
      showPriceFilter: true,
      priceFilterOptions: [],
    },
  },
  sorts: {
    rating: {
      showRatingSort: true,
      ratingSortOptions: [],
    },
    area: {
      showAreaSort: true,
      areaSortOption: [],
    },
  },
};

export const fetchResultsConfigData = createAsyncThunk(
  "resultConfigData/fetchResultsConfigData",
  async (req, thunkApi) => {
    const response = await axios.get(
      "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/configuration?tenantName=Kickdrum&property=Team-04%23roomResultsPage"
    );
    return JSON.parse(response.data.roomResultsPage);
  }
);

export const roomResultsConfigDataSlice = createSlice({
  name: "resultsConfiguration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResultsConfigData.fulfilled, (state, action) => {
      console.log(action.payload);
      const { filters, sorts } = action.payload;
      state.filters.bedTypeFilter.showBedFilter = filters.bedTypeFilter.showBedFilter;
      state.filters.bedTypeFilter.bedFilterArrayOptions = [
        ...filters.bedTypeFilter.bedFilterArrayOptions,
      ];
      state.filters.numberOfBedsFilter.showNumberOfBedFilter =
        filters.numberOfBedsFilter.showNumberOfBedFilter;
      state.filters.numberOfBedsFilter.numberOfBedsFilterOptions = [
        ...filters.numberOfBedsFilter.numberOfBedsFilterOptions,
      ];
      state.filters.priceFilter.showPriceFilter = filters.priceFilter.showPriceFilter;
      state.filters.priceFilter.priceFilterOptions = [...filters.priceFilter.priceFilterOptions];
      state.filters.roomTypeFilter.showRoomTypeFilter = filters.roomTypeFilter.showRoomTypeFilter;
      state.filters.roomTypeFilter.roomTypeFilterArrayOptions = [
        ...filters.roomTypeFilter.roomTypeFilterArrayOptions,
      ];
      state.sorts.area.showAreaSort = sorts.area.showAreaSort;
      state.sorts.area.areaSortOption = [...sorts.area.areaSortOption];
      state.sorts.rating.showRatingSort = sorts.rating.showRatingSort;
      state.sorts.rating.ratingSortOptions = [...sorts.rating.ratingSortOptions];
    });
    builder.addCase(fetchResultsConfigData.rejected, (state) => {
      console.log("rejected");
    });
  },
});

export default roomResultsConfigDataSlice.reducer;
