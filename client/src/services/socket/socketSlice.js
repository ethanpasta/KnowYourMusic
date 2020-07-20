import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import socketClient from "./socketClient";

/** Redux thunk action - connect the socket */
export const connectSocket = createAsyncThunk("socket/connect", async () => socketClient.connect());

/** Redux thunk action - disconnect the socket*/
export const disconnectSocket = createAsyncThunk("socket/disconnect", async () =>
	socketClient.disconnect()
);

/** Socket reducer - handle all actions related to connections with socket */
const socket = createSlice({
	name: "socket",
	initialState: {
		connected: false,
		loading: false,
	},
	reducers: {},
	extraReducers: {
		[connectSocket.pending]: state => {
			state.loading = true;
		},
		[connectSocket.fulfilled]: state => {
			state.loading = false;
			state.connected = true;
		},
		[connectSocket.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
		[disconnectSocket.fulfilled]: state => {
			state.connected = false;
		},
	},
});

const recieveDataAction = createAction("game/receive_data");

/** Redux thunk action - listen for data through the socket, and dispatch action when recieved */
export const listenForData = createAsyncThunk("game/get_data", async (_, { dispatch }) => {
	return socketClient.on("game_ready", data => {
		dispatch(recieveDataAction(data));
	});
});

/** game data reducer - handles all action related to game data */
const gameData = createSlice({
	name: "gameData",
	initialState: {
		loading: false,
	},
	reducers: {},
	extraReducers: {
		[recieveDataAction]: (state, action) => {
			state.loading = false;
			state.gameID = action.payload.id;
			state.gameData = action.payload.data;
		},
		[listenForData.pending]: state => {
			state.loading = true;
		},
		[listenForData.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
	},
});

export const socketReducer = socket.reducer;
export const gameDataReducer = gameData.reducer;

export const recieveLevelResult = createAction("game/recieve_response");

/** Redux thunk action - send the selected level choice on the socket, and listen for the response */
export const sendChoiceAndListen = createAsyncThunk(
	"game/send_choice",
	async (user_choice, { getState, dispatch, rejectWithValue }) => {
		try {
			const { game } = getState();
			if (game.play.currLevel != user_choice.level) return rejectWithValue("Level mismatch");
			socketClient.emit("submit_level", user_choice);
			return socketClient.on("level_response", level_result => {
				if (
					game.play.currLevel != user_choice.level ||
					game.play.currLevel != level_result.level ||
					user_choice.level != level_result.level ||
					level_result.error
				) {
					return rejectWithValue(level_result.error || "Level mismatch");
				}
				dispatch(recieveLevelResult(level_result));
			});
		} catch (e) {
			return Promise.reject(e);
		}
	}
);
