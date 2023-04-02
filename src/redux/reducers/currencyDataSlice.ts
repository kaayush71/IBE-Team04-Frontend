import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface State {
  selectedCurrency: {
    name: string;
    rate: number;
    symbol: string;
  };

  rates: {
    USD: number;
    INR: number;
    EUR: number;
  };
}

const initialState: State = {
  selectedCurrency: {
    name: "USD",
    rate: 1,
    symbol: "$",
  },
  rates: {
    USD: 1,
    INR: 1,
    EUR: 1,
  },
};

// getting the currency exchange rates frrom
// the exteranl api and setting it to our
// local redux state.
export const fetchCurrencyData = createAsyncThunk(
  "currencyData/fetchCurrencyData",
  async (req, thunkApi) => {
    const response = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
    return response.data.rates;
  }
);

export const currencyDataSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setSelectedCuurency: (state, action) => {
      const currency = action.payload;
      if (currency === "USD") {
        state.selectedCurrency.name = action.payload;
        state.selectedCurrency.rate = state.rates.USD;
        state.selectedCurrency.symbol = "$";
      } else if (currency === "INR") {
        state.selectedCurrency.name = action.payload;
        state.selectedCurrency.rate = state.rates.INR;
        state.selectedCurrency.symbol = "₹";
      } else if (currency === "EUR") {
        state.selectedCurrency.name = action.payload;
        state.selectedCurrency.rate = state.rates.EUR;
        state.selectedCurrency.symbol = "€";
      } else {
        throw new Error("Currency Symbol not supported");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencyData.fulfilled, (state, action) => {
      state.rates = action.payload;
    });
  },
});

export default currencyDataSlice.reducer;
export const { setSelectedCuurency } = currencyDataSlice.actions;
