// import axios from "axios";
import { bed, guest, rooms } from "../../constants/types";
import { addDays } from "date-fns";
import { createSlice } from "@reduxjs/toolkit";
// import RoomResults from "../../components/results/RoomResults";

interface formSubmitData {
  startDate: string;
  endDate: string;
  rooms: rooms;
  guest: guest;
  bed: bed;
}
const initialState: formSubmitData = {
  startDate: new Date().toDateString(),
  endDate: addDays(new Date(), 2).toDateString(),
  rooms: {
    roomCountSelected: 1,
    roomCountArray: [1],
  },
  guest: {
    guestTypes: [],
  },
  bed: {
    bedCountSelected : 1,
    bedCountArray : [1]
  },
};

export const roomResultsDataSlice = createSlice({
  name: "roomResultsDataSlice",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setRooms: (state, action) => {
        state.rooms = action.payload;
    },
    setGuest:(state, action) => {
        state.guest = action.payload;
    },
    setBedCount:(state, action) => {
        state.bed = action.payload;
    }
  },
  
});


export default roomResultsDataSlice.reducer;

export const {
    setStartDate,
    setEndDate,
    setRooms,
    setGuest,
    setBedCount

} = roomResultsDataSlice.actions;