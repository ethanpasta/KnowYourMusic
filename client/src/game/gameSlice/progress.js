import { createSlice } from "@reduxjs/toolkit";
import { sendChoiceAndListen, recieveLevelResult } from "../../services/socket/socketSlice";

const gameplay = createSlice({
	name: "gameplay",
	initialState: {
		loading: false,
		currLevel: 0,
		score: 0,
		results: {},
	},
	reducers: {
		updateLevel: (state, action) => {
			state.currLevel = action.payload;
		},
	},
	extraReducers: {
		[sendChoiceAndListen.pending]: state => {
			state.loading = true;
		},
		[sendChoiceAndListen.fulfilled]: state => {
			state.loading = true;
		},
		[sendChoiceAndListen.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[recieveLevelResult]: (state, action) => {
			state.loading = false;
			const { levelPassed, correctOption } = action.payload;
			state.score += levelPassed;
			state.results[state.currLevel] = { levelPassed, correctOption };
		},
	},
});

export const { updateLevel } = gameplay.actions;
export default gameplay.reducer;
