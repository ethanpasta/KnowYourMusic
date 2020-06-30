import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import App from "./App";
import rootReducer from "./state/reducers";
import { fetchUserAccount } from "./state/userSlice";
import { fetchPlaylistInfo } from "./state/playlistsSlice";
import socketClient from "./socket/socketClient";
import socketMiddleware from "./socket/socketMiddleware";

const middleware = [socketMiddleware(socketClient), ...getDefaultMiddleware()];

// Add logger to middleware if in development mode
if (process.env.NODE_ENV.trim() == "development") {
	console.log("hi");
	const { logger } = require("redux-logger");
	/* middleware.push(logger); */
}

const store = configureStore({
	reducer: rootReducer,
	middleware,
	devTools: process.env.NODE_ENV.trim() == "development",
});

store.dispatch(fetchUserAccount());
store.dispatch(fetchPlaylistInfo());

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
