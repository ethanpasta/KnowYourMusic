import { configureStore, getDefaultMiddleware, combineReducers } from "@reduxjs/toolkit";
import socketClient from "./utils/socket/socketClient";
import socketMiddleware from "./utils/socket/socketMiddleware";
import homeReducer from "./home/homeSlice";
import gameReducer from "./game/gameSlice";

const rootReducer = combineReducers({
	user: homeReducer.userReducer,
	playlists: homeReducer.playlistsReducer,
	game: gameReducer,
});

export default rootReducer;

export const store = configureStore({
	reducer: rootReducer,
	middleware: [socketMiddleware(socketClient), ...getDefaultMiddleware()],
	devTools: process.env.NODE_ENV.trim() == "development",
});
