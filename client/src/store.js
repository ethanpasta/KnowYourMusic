import { configureStore, getDefaultMiddleware, combineReducers } from "@reduxjs/toolkit";
import socketClient from "./services/socket/socketClient";
import socketMiddleware from "./services/socket/socketMiddleware";
import userReducer from "./home/homeSlice/user";
import playlistsReducer from "./home/homeSlice/playlists";
import gameReducer from "./game/gameSlice";
import { connectReducer, gameDataReducer } from "./services/socket/socketSlice";

const game = combineReducers({
	play: gameReducer,
	data: gameDataReducer,
});

export const rootReducer = combineReducers({
	user: userReducer,
	playlists: playlistsReducer,
	game,
	socket: connectReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: [socketMiddleware(socketClient), ...getDefaultMiddleware()],
	devTools: process.env.NODE_ENV.trim() == "development",
});
