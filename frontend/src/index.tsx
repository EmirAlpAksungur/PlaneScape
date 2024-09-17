import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
