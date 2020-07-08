const [LISTEN_GAMEDATA, LISTEN_GAMEDATA_SUCCESS, LISTEN_GAMEDATA_FAIL] = [
	"game/listen_gamedata",
	"game/listen_gamedata_success",
	"game/listen_gamedata_fail",
];
const RECIEVE_GAMEDATA = "game/recieve_gamedata";

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

export default function reducer(state = { loading: true }, action) {
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
