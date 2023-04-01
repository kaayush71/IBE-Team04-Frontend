import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface RoomResultsConfig {
  filters: {
    filterName: string;
    sendingName: string;
    show: boolean;
    options: string[];
    selectedOptions: string[];
  }[];
  sorts: {
    sortName: string;
    show: boolean;
    sendingName: string;
    options: string[];
    selectedOptions: "";
  }[];
  beds: {
    defaultBedCount: number;
    bedCountArray: number[];
    showBed: boolean;
  };
  roomType: {
    [key: string]: string[];
  };
  numberOfBedsSelected: number;
  sortToSend: string;
  selectedSortName: string;
  selectedSortValue: string;
}

const initialState: RoomResultsConfig = {
  filters: [],
  sorts: [],
  beds: {
    defaultBedCount: 1,
    bedCountArray: [1],
    showBed: true,
  },
  roomType: {},
  numberOfBedsSelected: 1,
  sortToSend: "",
  selectedSortName: "",
  selectedSortValue: "",
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
  reducers: {
    setFilter: (state, action) => {
      const { filterName, option } = action.payload;
      const selectedFilter = state.filters.find((filter) => filter.filterName === filterName);
      if (selectedFilter !== undefined) {
        if (selectedFilter.selectedOptions.includes(option)) {
          const newSelectedOptions = selectedFilter.selectedOptions.filter(
            (filterOption) => filterOption !== option
          );
          selectedFilter.selectedOptions = newSelectedOptions;
        } else {
          selectedFilter.selectedOptions.push(action.payload.option);
        }
      }
    },
    setSortToSend: (state, action) => {
      console.log(action.payload);
      const sortSubStrings = action.payload.split("#");
      const sortName = sortSubStrings[0];
      const sortValue = sortSubStrings[1];
      state.selectedSortName = sortName;
      state.selectedSortValue = sortValue;
      const sortToSend = state.sorts.find((sort) => sort.sortName === sortName);
      if (sortToSend !== undefined) {
        state.sortToSend = `${sortToSend.sendingName}#${sortValue}`;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResultsConfigData.fulfilled, (state, action) => {
      console.log("room results data");
      state.filters = action.payload.filters;
      state.sorts = action.payload.sorts;
      state.roomType = action.payload.roomType;
      state.beds = action.payload.beds;
      console.log("room results completed");
    });
    builder.addCase(fetchResultsConfigData.rejected, (state) => {
      console.log("rejected");
    });
  },
});

export const { setSortToSend, setFilter } = roomResultsConfigDataSlice.actions;
export default roomResultsConfigDataSlice.reducer;
