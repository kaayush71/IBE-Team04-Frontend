import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import App from "./App";
import "./index.scss";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { PersistGate } from "redux-persist/integration/react";

const apiKey = "V-mVKAEuQEtfzNK-KL5x6Q";
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

// i18next for language conversion
// getting the browser default language first
i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    ns: ["default"],
    defaultNS: "default",
    supportedLngs: ["en", "fr"],

    backend: {
      loadPath: loadPath,
    },
  });

const container = document.getElementById("root")!;
const root = createRoot(container);
Sentry.init({
  dsn: "https://4a989206e8e0452d91882b6faf53f3f5@o4504796907044864.ingest.sentry.io/4504846936899584",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});
root.render(
  <Suspense fallback={<></>}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Suspense>
);
