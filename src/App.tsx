import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Landing from "./components/landing/Landing";
import { routesPath } from "./constants/routes";
import { fetchStaticCompanyData } from "./redux/reducers/configDataSlice";
import { fetchCurrencyData } from "./redux/reducers/currencyDataSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { setSelectedLanguage } from "./redux/reducers/languageDataSlice";

function App() {
  const reduxDispatch = useAppDispatch();
  const supportedLanguages = useAppSelector((state) => state.language.supportedLanguage);
  const testBackend = async () => {
    const response = await axios.get(
      "https://95xedsf044.execute-api.ap-south-1.amazonaws.com/dev/api/v1/health"
    );

    console.log("backend api respone", response.data);
  };
  const { i18n } = useTranslation();
  useEffect(() => {
    const browserLanguage = navigator.language;
    // checking if the user default browser
    // language is supported by our application
    // or not.
    if (supportedLanguages.includes(browserLanguage)) {
      reduxDispatch(setSelectedLanguage(browserLanguage));
      i18n.changeLanguage(browserLanguage);
    } else {
      reduxDispatch(setSelectedLanguage("en"));
      i18n.changeLanguage("en");
    }
    reduxDispatch(fetchStaticCompanyData());
    reduxDispatch(fetchCurrencyData());
    testBackend();
  }, [reduxDispatch, i18n, supportedLanguages]);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={routesPath.landing} element={<Landing />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
