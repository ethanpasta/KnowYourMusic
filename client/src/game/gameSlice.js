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
const RECIEVE_GAMEDATA = "game/recieve";

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
		const recieve = gameData => {
			return dispatch({
				type: RECIEVE_GAMEDATA,
				payload: gameData,
			});
		};
		return dispatch({
			type: "socket",
			types: [LISTEN_GAMEDATA, LISTEN_GAMEDATA_SUCCESS, LISTEN_GAMEDATA_FAIL],
			promise: socket => socket.on("game_ready", recieve),
		});
	};
}

export default function reducer(state = { loading: true }, action = {}) {
	switch (action.type) {
		case CONNECT_FAIL: {
			return {
				...state,
				loading: false,
				error: action.error,
			};
		}
		case DISCONNECT_FAIL: {
			return {
				...state,
				loading: false,
				error: action.error,
			};
		}
		case RECIEVE_GAMEDATA: {
			return {
				...state,
				loading: false,
				gameData: action.payload,
			};
		}
		default: {
			return state;
		}
	}
}
