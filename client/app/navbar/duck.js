import fetch from "cross-fetch";

const REQUEST_ACCOUNT = "navbar/request";
const RECEIVE_ACCOUNT = "navbar/receive";
const RECEIVE_ERROR = "navbar/error";

export const requestAccountInfo = () => ({ type: REQUEST_ACCOUNT });
export const receiveAccountInfo = data => ({ type: RECEIVE_ACCOUNT, payload: { data } });
export const receiveError = err => ({ type: RECEIVE_ERROR, payload: { err } });

export function getAccountInfo() {
	return dispatch => {
		dispatch(requestAccountInfo());
		return fetch("/api/me")
			.then(res => res.json())
			.then(data => dispatch(receiveAccountInfo(data)))
			.catch(err => dispatch(receiveError(err)));
	};
}

const accountReducer = (state = { fetchingAccount: false }, action) => {
	switch (action.type) {
		case REQUEST_ACCOUNT:
			return Object.assign({}, state, { fetchingAccount: true });
		case RECEIVE_ACCOUNT:
			return {
				fetchingAccount: false,
				data: action.payload.data,
			};
		case RECEIVE_ERROR:
			return {
				fetchingAccount: false,
				error: true,
			};
		default:
			return state;
	}
};

export default accountReducer;
