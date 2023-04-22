import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import calendarDataSlice from "./reducers/calendarDataSlice";
import configDataSlice from "./reducers/configDataSlice";
import currencyDataSlice from "./reducers/currencyDataSlice";
import landingSearchFormSlice from "./reducers/landingSearchFormSlice";
import languageDataSlice from "./reducers/languageDataSlice";
import roomResultConfigDataSlice from "./reducers/roomResultConfigDataSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import checkoutDataSlice from "./reducers/checkoutDataSlice";
import promotionsDataSlice from "./reducers/promotionsDataSlice";
import checkoutConfigDataSlice from "./reducers/checkoutFormDataSlice";
import confirmBookingSlice from "./reducers/confirmBookingSlice";
import ratingsDataSlice from "./reducers/ratingsDataSlice";

// for currency conversion
const persistConfig = {
  key: "currency",
  storage,
};

// for language conversion
const languageConfig = {
  key: "language",
  storage,
};

// user checkout data
const checkoutConfig = {
  key: "checkout",
  storage,
};

// creating a combineReducers with different
// persist config so that it easy to manipulate the
// data stored in local storage
const reducers = combineReducers({
  config: configDataSlice,
  currency: persistReducer(persistConfig, currencyDataSlice),
  language: persistReducer(languageConfig, languageDataSlice),
  landingForm: landingSearchFormSlice,
  calendar: calendarDataSlice,
  resultsConfiguration: roomResultConfigDataSlice,
  checkout: persistReducer(checkoutConfig, checkoutDataSlice),
  promotions: promotionsDataSlice,
  checkoutConfig: checkoutConfigDataSlice,
  confirmBooking: confirmBookingSlice,
  ratings: ratingsDataSlice,
});

// using redux persist to persist specific
// reducers automatically.
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
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
export const persistor = persistStore(store);
