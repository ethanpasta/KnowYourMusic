import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const startGameAction = createAsyncThunk("home/start", async () => {
	try {
		const response = await fetch("api/user/start");
		return await response.json();
	} catch (e) {
		console.log(e);
		return Promise.reject(e);
	}
});

const gameSlice = createSlice({
	name: "game",
	initialState: {},
	reducers: {},
	extraReducers: {
		[startGameAction.pending]: state => ({ ...state, loading: state.loading || true }),
		[startGameAction.fulfilled]: (state, action) => {
			if (state.loading) {
				const { success, error } = action.payload;
				return { ...state, loading: false, success, error };
			}
		},
		[startGameAction.rejected]: (state, action) => {
			if (state.loading) {
				return { ...state, loading: false, error: action.error };
			}
		},
	},
});

export default gameSlice.reducer;
