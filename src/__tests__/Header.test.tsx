import { act, render } from "@testing-library/react";
import Header from "../components/header/Header";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

describe("Header", () => {
  test("renders application title", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <Provider store={store}>
          <Header />
        </Provider>
      );
    });
  });
});
