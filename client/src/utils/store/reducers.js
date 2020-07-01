import { combineReducers } from "@reduxjs/toolkit";
import home from "../../home/homeSlice";
import gameReducer from "../../game/gameSlice";

const rootReducer = combineReducers({
	user: home.userReducer,
	playlists: home.playlistsReducer,
	game: gameReducer,
});

export default rootReducer;
