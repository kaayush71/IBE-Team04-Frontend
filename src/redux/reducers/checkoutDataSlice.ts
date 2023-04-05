import { createSlice } from "@reduxjs/toolkit";
import { RoomType } from "./roomResultConfigDataSlice";

interface Checkout {
  room: RoomType;
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
};

export const checkoutDataSlice = createSlice({
  name: "checkoutDataSlice",
  initialState,
  reducers: {},
});

export default checkoutDataSlice.reducer;
