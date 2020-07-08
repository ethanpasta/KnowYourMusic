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

export default function reducer(state = {}, action) {
	switch (action.type) {
		case CONNECT_FAIL:
			return {
				...state,
				loading: false,
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
