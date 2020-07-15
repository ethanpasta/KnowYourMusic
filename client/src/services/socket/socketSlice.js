const [CONNECT, CONNECT_SUCCESS, CONNECT_FAIL] = [
	"socket/connect",
	"socket/connect_success",
	"socket/connect_fail",
];
const [DISCONNECT, DISCONNECT_SUCCESS, DISCONNECT_FAIL] = [
	"socket/disconnect",
	"socket/disconnect_success",
	"socket/disconnect_fail",
];
const [LISTEN_GAMEDATA, LISTEN_GAMEDATA_SUCCESS, LISTEN_GAMEDATA_FAIL] = [
	"game/listen_gamedata",
	"game/listen_gamedata_success",
	"game/listen_gamedata_fail",
];
const RECIEVE_GAMEDATA = "game/recieve_gamedata";

export function connectSocket() {
	return {
		type: "socket",
		types: [CONNECT, CONNECT_SUCCESS, CONNECT_FAIL],
		promise: socket => socket.connect(),
	};
}

export function disconnectSocket() {
	return {
		type: "socket",
		types: [DISCONNECT, DISCONNECT_SUCCESS, DISCONNECT_FAIL],
		promise: socket => socket.disconnect(),
	};
}

export function listenForData() {
	return dispatch => {
		const recieve = gameInfo => {
			return dispatch({
				type: RECIEVE_GAMEDATA,
				payload: gameInfo,
			});
		};
		return dispatch({
			type: "socket",
			types: [LISTEN_GAMEDATA, LISTEN_GAMEDATA_SUCCESS, LISTEN_GAMEDATA_FAIL],
			promise: socket => socket.on("game_ready", recieve),
		});
	};
}

export function connectReducer(state = { connected: false }, action) {
	switch (action.type) {
		case CONNECT_SUCCESS:
			return {
				...state,
				loading: false,
				connected: true,
			};
		case CONNECT_FAIL:
			return {
				...state,
				loading: false,
				connected: false,
				error: action.error,
			};

		case DISCONNECT_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
}

export function gameDataReducer(state = { loading: true }, action) {
	switch (action.type) {
		case LISTEN_GAMEDATA_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case RECIEVE_GAMEDATA:
			return {
				...state,
				loading: false,
				gameID: action.payload.id,
				gameData: action.payload.data,
			};
		default:
			return state;
	}
}
