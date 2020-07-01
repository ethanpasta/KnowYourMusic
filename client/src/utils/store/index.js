import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import socketClient from "../socket/socketClient";
import socketMiddleware from "../socket/socketMiddleware";

const middleware = [socketMiddleware(socketClient), ...getDefaultMiddleware()];

export const store = configureStore({
	reducer: rootReducer,
	middleware,
	devTools: process.env.NODE_ENV.trim() == "development",
});
