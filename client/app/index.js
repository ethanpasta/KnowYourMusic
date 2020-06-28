import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import App from "./App";
import rootReducer from "./state/reducers";
import { fetchUserAccount } from "./state/userSlice";
import { fetchPlaylistInfo } from "./state/playlistsSlice";

const middlewares = [...getDefaultMiddleware()];

// Add logger to middleware if in development mode
if (process.env.NODE_ENV === `development`) {
	const { logger } = require("redux-logger");
	middlewares.push(logger);
}

const store = configureStore({
	reducer: rootReducer,
	middlewares,
	devTools: process.env.NODE_ENV !== "production",
});

store.dispatch(fetchUserAccount());
store.dispatch(fetchPlaylistInfo());

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
