import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export default userSlice.reducer;
