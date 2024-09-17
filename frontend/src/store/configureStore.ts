import { configureStore, combineReducers, Middleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import { notification } from "../services/reducers";
const { logger } = require(`redux-logger`);
export interface RootState {
  notification: any;
}

const middleware: Middleware[] = [thunk, logger];

const rootReducer = combineReducers<RootState>({
  notification: notification,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export const persistor = store;
export type AppDispatch = typeof store.dispatch;
