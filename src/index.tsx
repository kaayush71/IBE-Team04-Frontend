import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./index.scss";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const container = document.getElementById("root")!;
const root = createRoot(container);
Sentry.init({
  dsn: "https://4a989206e8e0452d91882b6faf53f3f5@o4504796907044864.ingest.sentry.io/4504846936899584",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
