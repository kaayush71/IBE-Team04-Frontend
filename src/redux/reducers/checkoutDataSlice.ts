import { createSlice } from "@reduxjs/toolkit";
import { RoomType } from "./roomResultConfigDataSlice";

interface Checkout {
  room: RoomType;
  showItineraryCard: boolean;
}

const initialState: Checkout = {
  room: {
    areaInSquareFeet: 0,
    doubleBed: 0,
    maxCapacity: 0,
    roomTypeName: "",
    roomTypeId: 0,
    propertyAddress: "",
    singleBed: 0,
    roomRate: 0,
    bedType: "",
    priceType: "",
  },
  showItineraryCard: false,
};

export const checkoutDataSlice = createSlice({
  name: "checkoutDataSlice",
  initialState,
  reducers: {
    setShowItineraryCard: (state, action) => {
      state.showItineraryCard = action.payload;
    },
  },
});

export const { setShowItineraryCard } = checkoutDataSlice.actions;

export default checkoutDataSlice.reducer;
