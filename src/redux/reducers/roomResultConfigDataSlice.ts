import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Promotion } from "../../constants/types";

export interface RoomType {
  areaInSquareFeet: number;
  doubleBed: number;
  maxCapacity: number;
  roomTypeName: string;
  roomTypeId: number;
  propertyAddress: string;
  singleBed: number;
  roomRate: number;
  bedType: string;
  priceType: string;
  bestPromotion: Promotion;
  ratingAndReviews: {
    showRatingsAndReviews: boolean;
    averageRatingValue: number;
    numberOfRatings: number;
  };
}

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
    [key: string]: {
      images: string[];
      ammenities: string[];
      description: string;
    };
  };
  numberOfBedsSelected: number;
  sortToSend: string;
  selectedSortName: string;
  selectedSortValue: string;
  roomTypeList: RoomType[];
  totalNumberOfData: number;
  roomResultsLoading: boolean;
  selectedPage: number;
  isError: boolean;
  startPage: number;
  resultConfigLoading: boolean;
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
  roomTypeList: [],
  totalNumberOfData: 3,
  roomResultsLoading: true,
  selectedPage: 1,
  isError: false,
  startPage: 1,
  resultConfigLoading: true,
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

export const fetchRoomResultsGraphQlData = createAsyncThunk(
  "roomResultsData",
  async (req: any, thunkApi) => {
    console.log("inside graph ql response", req);
    const response = await axios.post(
      "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/graphql/getRoomResults/4",
      req,
      {
        params: {
          startTime: `"${req.startTime}T00:00:00Z"`,
          endTime: `"${req.endTime}T00:00:00Z"`,
        },
      }
    );
    console.log(response.status);
    return response.data;
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
      const formData = JSON.parse(localStorage.getItem("formData") || "{}");
      formData.filters = state.filters;
      localStorage.setItem("formData", JSON.stringify(formData));
    },
    setExistingFilters: (state, action) => {
      const { filterName, option } = action.payload;
      const selectedFilter = state.filters.find((filter) => filter.filterName === filterName);
      if (selectedFilter !== undefined) {
        selectedFilter.selectedOptions = option;
      }
    },
    setSortToSend: (state, action) => {
      console.log("inside set sort to send", action.payload);
      const sortSubStrings = action.payload.split("#");
      const sortName = sortSubStrings[0];
      const sortValue = sortSubStrings[1];
      state.selectedSortName = sortName;
      state.selectedSortValue = sortValue;
      const formData = JSON.parse(localStorage.getItem("formData") || "{}");
      const sortToSend = state.sorts.find((sort) => sort.sortName === sortName);
      if (sortToSend !== undefined) {
        console.log("set sort to send", `${sortToSend.sendingName}#${sortValue}`);
        formData.sortToSend = `${sortToSend.sendingName}#${sortValue}`;
        localStorage.setItem("formData", JSON.stringify(formData));
        state.sortToSend = `${sortToSend.sendingName}#${sortValue}`;
      }
    },
    setPageNumber: (state, action) => {
      state.selectedPage = action.payload;
    },
    setStartPage: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResultsConfigData.fulfilled, (state, action) => {
      state.filters = action.payload.filters;
      state.sorts = action.payload.sorts;
      state.roomType = action.payload.roomType;
      state.beds = action.payload.beds;
      const formData = JSON.parse(localStorage.getItem("formData") || "{}");
      localStorage.setItem("page", `${state.selectedPage}`);
      if (formData.filters === undefined || formData.filters.length === 0) {
        formData.filters = state.filters;
        localStorage.setItem("formData", JSON.stringify(formData));
      } else {
        return;
      }
      state.resultConfigLoading = false;
    });
    builder.addCase(fetchResultsConfigData.rejected, (state) => {
      console.log("room result config rejected");
    });
    builder.addCase(fetchRoomResultsGraphQlData.pending, (state, action) => {
      state.roomResultsLoading = true;
    });
    builder.addCase(fetchRoomResultsGraphQlData.fulfilled, (state, action) => {
      console.log("graph ql response", action.payload);
      state.roomTypeList = action.payload.roomTypeList;
      state.totalNumberOfData = action.payload.totalNumberOfData;
      state.roomResultsLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchRoomResultsGraphQlData.rejected, (state) => {
      console.log("Grpah ql call rejected");
      state.isError = true;
      state.roomResultsLoading = false;
    });
  },
});

export const { setSortToSend, setFilter, setExistingFilters, setPageNumber, setStartPage } =
  roomResultsConfigDataSlice.actions;
export default roomResultsConfigDataSlice.reducer;
