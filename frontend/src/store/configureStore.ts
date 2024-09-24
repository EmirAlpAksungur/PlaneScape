import { configureStore, combineReducers, Middleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import { notification, form, flights, roundTrip } from "../services/reducers";
const { logger } = require(`redux-logger`);
export interface RootState {
  flights: any;
  notification: any;
  form: any;
  roundTrip: any;
}

const middleware: Middleware[] = [thunk, logger];

const rootReducer = combineReducers<RootState>({
  flights: flights,
  notification: notification,
  form: form,
  roundTrip: roundTrip,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export const persistor = store;
export type AppDispatch = typeof store.dispatch;
