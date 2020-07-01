import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import playlistsReducer from "./playlistsSlice";
import gameReducer from "../game/gameSlice";

const rootReducer = combineReducers({
	user: userReducer,
	playlists: playlistsReducer,
	game: gameReducer,
});

export default rootReducer;
