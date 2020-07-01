import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPlaylistsData = createAsyncThunk("playlists/fetchPlaylists", async () => {
	try {
		const response = await fetch("/api/playlists");
		return await response.json();
	} catch (e) {
		return Promise.reject(e);
	}
});

const playlistsSlice = createSlice({
	name: "playlists",
	initialState: {
		loading: true,
		data: undefined,
		error: undefined,
	},
	reducers: {},
	extraReducers: {
		[fetchPlaylistsData.pending]: state => ({ ...state, loading: state.loading || true }),
		[fetchPlaylistsData.fulfilled]: (state, action) => {
			if (state.loading) {
				return { ...state, loading: false, data: action.payload };
			}
		},
		[fetchPlaylistsData.rejected]: (state, action) => {
			if (state.loading) {
				return { ...state, loading: false, error: action.error };
			}
		},
	},
});

export const fetchUserAccount = createAsyncThunk("user/fetchAccount", async () => {
	try {
		const response = await fetch("/api/user/me");
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
	},
	reducers: {},
	extraReducers: {
		[fetchUserAccount.pending]: state => ({ ...state, loading: state.loading || true }),
		[fetchUserAccount.fulfilled]: (state, action) => {
			if (state.loading) {
				const { profile, loggedIn, error } = action.payload;
				return { ...state, loading: false, loggedIn, profile, error };
			}
		},
		[fetchUserAccount.rejected]: (state, action) => {
			if (state.loading) {
				return { ...state, loading: false, error: action.error };
			}
		},
	},
});

export default {
	userReducer: userSlice.reducer,
	playlistsReducer: playlistsSlice.reducer,
};
