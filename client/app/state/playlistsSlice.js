import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPlaylistInfo = createAsyncThunk("playlists/fetchPlaylists", async () => {
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

export default playlistsSlice.reducer;
