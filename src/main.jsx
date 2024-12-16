import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import { puppyBowlApi } from "./API";

const store = configureStore({
  reducer: {
    [puppyBowlApi.reducerPath]: puppyBowlApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(puppyBowlApi.middleware),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
