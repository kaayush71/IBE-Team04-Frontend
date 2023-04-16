import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Landing from "./components/landing/Landing";
import RoomResults from "./components/roomResults/RoomResults";
import { routesPath } from "./constants/routes";
import { fetchStaticCompanyData } from "./redux/reducers/configDataSlice";
import { fetchCurrencyData } from "./redux/reducers/currencyDataSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { useTranslation } from "react-i18next";
import { setSelectedLanguage } from "./redux/reducers/languageDataSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@aws-amplify/ui-react/styles.css";

import Login from "./components/login/Login";
import Checkout from "./components/checkout/Checkout";
import RatingPage from "./components/rating/Rating";
import BookingConfirmation from "./components/bookingConfirmation/BookingConfirmation";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Lato",
      textTransform: "none",
      fontWeight: 400,
      fontSize: 16,
    },
  },
});

function App() {
  const reduxDispatch = useAppDispatch();
  const supportedLanguages = useAppSelector((state) => state.language.supportedLanguage);
  const selectedLanguage = useAppSelector((state) => state.language.selectedLanguage);
  const { i18n } = useTranslation();
  useEffect(() => {
    const browserLanguage = navigator.language;
    // checking if the user default browser
    // language is supported by our application
    // or not.
    if (selectedLanguage === "") {
      if (supportedLanguages.includes(browserLanguage)) {
        reduxDispatch(setSelectedLanguage(browserLanguage));
        i18n.changeLanguage(browserLanguage);
      } else {
        reduxDispatch(setSelectedLanguage("en"));
        i18n.changeLanguage("en");
      }
    } else {
      reduxDispatch(setSelectedLanguage(selectedLanguage));
      i18n.changeLanguage(`${selectedLanguage}`);
    }

    reduxDispatch(fetchStaticCompanyData());
    reduxDispatch(fetchCurrencyData());
  }, [reduxDispatch, i18n, supportedLanguages, selectedLanguage]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={routesPath.landing} element={<Landing />} />
            <Route path={routesPath.roomResults} element={<RoomResults />} />
            <Route path={routesPath.login} element={<Login />} />
            <Route path={routesPath.checkout} element={<Checkout />} />
            <Route path={`${routesPath.rating}/:id`} element={<RatingPage />} />
            <Route path={`${routesPath.confirmBooking}/:id`} element={<BookingConfirmation />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
