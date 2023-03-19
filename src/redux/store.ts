import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import configDataSlice from "./reducers/configDataSlice";
import currencyDataSlice from "./reducers/currencyDataSlice";
import languageDataSlice from "./reducers/languageDataSlice";

export const store = configureStore({
  reducer: {
    config: configDataSlice,
    currency: currencyDataSlice,
    language: languageDataSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
