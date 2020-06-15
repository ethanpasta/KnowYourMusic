import { createSlice, createAsyncThunk, combineReducers } from "@reduxjs/toolkit";

export const fetchUserAccount = createAsyncThunk("user/fetchAccount", async () => {
	try {
		const response = await fetch("/api/user/me");
		return await response.json();
	} catch (e) {
		return Promise.reject(e);
	}
});

export const fetchPlaylistInfo = createAsyncThunk("playlists/fetchPlaylists", async () => {
	try {
		const response = await fetch("/api/playlists");
		return await response.json();
	} catch (e) {
		return Promise.reject(e);
	}
});

const userSlice = createSlice({
	name: "user",
	initialState: {
		loading: true,
		loggedIn: false,
		user: null,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[fetchUserAccount.pending]: state => ({ ...state, loading: state.loading || true }),
		[fetchUserAccount.fulfilled]: (state, action) => {
			if (state.loading) {
				const { user, loggedIn, error } = action.payload;
				return { ...state, loading: false, loggedIn, user, error };
			}
		},
		[fetchUserAccount.rejected]: (state, action) => {
			if (state.loading) {
				return { ...state, loading: false, error: action.error };
			}
		},
	},
});

const playlistsSlice = createSlice({
	name: "playlists",
	initialState: {
		loading: true,
		data: null,
		error: null,
	},
	reducers: {},
	extraReducers: {
		[fetchPlaylistInfo.pending]: state => ({ ...state, loading: state.loading || true }),
		[fetchPlaylistInfo.fulfilled]: (state, action) => {
			if (state.loading) {
				return { ...state, loading: false, data: action.payload };
			}
		},
		[fetchPlaylistInfo.rejected]: (state, action) => {
			if (state.loading) {
				return { ...state, loading: false, error: action.error };
			}
		},
	},
});

export default combineReducers({
	user: userSlice.reducer,
	playlists: playlistsSlice.reducer,
});
