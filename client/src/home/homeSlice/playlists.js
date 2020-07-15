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
				// TODO: Error handling
				return { ...state, loading: true, error: action.error };
			}
		},
	},
});

export default playlistsSlice.reducer;
