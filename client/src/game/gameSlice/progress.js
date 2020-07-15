const [SEND_ANSWER, SEND_ANSWER_SUCCESS, SEND_ANSWER_FAIL] = [
	"game/send_answer",
	"game/send_answer_success",
	"game/send_answer_fail",
];
const [LISTEN_LEVEL_RESPONSE, LEVEL_RESPONSE_SUCCESS, LEVEL_RESPONSE_FAIL] = [
	"game/listen_level_response",
	"game/level_response_success",
	"game/level_response_fail",
];
const RECIEVE_LEVEL_RESPONSE = "game/recieve_level_response";
const UPDATE_LEVEL = "game/update_level";

export function updateLevel(level) {
	return { type: UPDATE_LEVEL, payload: level };
}

export function signalChoice(chosenOption, level) {
	return {
		type: "socket",
		types: [SEND_ANSWER, SEND_ANSWER_SUCCESS, SEND_ANSWER_FAIL],
		promise: socket => socket.emit("submit_level", { chosenOption, level }),
	};
}

export function listenForLevelResponse() {
	return dispatch => {
		const recieve = levelResponse => {
			return dispatch({
				type: RECIEVE_LEVEL_RESPONSE,
				payload: levelResponse,
			});
		};
		return dispatch({
			type: "socket",
			types: [LISTEN_LEVEL_RESPONSE, LEVEL_RESPONSE_SUCCESS, LEVEL_RESPONSE_FAIL],
			promise: socket => socket.on("level_response", recieve),
		});
	};
}

const initialState = {
	loading: false,
	currLevel: 0,
	gameProgress: {},
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SEND_ANSWER:
			return {
				...state,
				loading: true,
			};
		case UPDATE_LEVEL:
			return {
				...state,
				currLevel: action.payload,
			};
		case RECIEVE_LEVEL_RESPONSE:
			if (action.payload.level != state.currLevel) {
				return {
					...state,
					loading: false,
					error: "Level doesn't match",
				};
			}
			return {
				...state,
				loading: false,
				gameProgress: {
					...state.gameProgress,
					[action.payload.level]: {
						levelPassed: action.payload.levelPassed,
						correctOption: action.payload.correctOption,
					},
				},
			};
		default: {
			return state;
		}
	}
}
