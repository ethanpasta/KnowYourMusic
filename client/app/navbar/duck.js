import fetch from "cross-fetch";

const REQUEST_PLAYLISTS = "navbar/request";
const RECEIVE_PLAYLISTS = "navbar/receive";
const RECEIVE_ERROR = "navbar/error";

export const requestPlaylistInfo = () => ({ type: REQUEST_ACCOUNT });
export const receivePlaylistInfo = data => ({ type: RECEIVE_ACCOUNT, payload: { data } });
export const receiveError = err => ({ type: RECEIVE_ERROR, payload: { err } });

export function getPlaylistData() {
	return dispatch => {
		dispatch(requestPlaylistInfo());
		return fetch("/api/playlists")
			.then(res => res.json())
			.then(data => dispatch(receivePlaylistInfo(data)))
			.catch(err => dispatch(receiveError(err)));
	};
}

const initialState = {
	fetching: false,
	playlists: undefined,
};

const accountReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_PLAYLISTS:
			return Object.assign({}, state, { fetching: true });
		case RECEIVE_PLAYLISTS:
			return {
				fetching: false,
				playlists: action.payload.data,
			};
		case RECEIVE_ERROR:
			return {
				fetching: false,
				error: true,
			};
		default:
			return state;
	}
};

export default accountReducer;
