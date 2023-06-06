import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		setNotification: (state, action) => {
			console.log("state", state);
			console.log("action", action);
			return action.payload;
		},
		removeNotification: (state, action) => {
			console.log("state", state);
			console.log("action", action);
			return null;
		},
	},
});

export const { setNotification, removeNotification } =
	notificationSlice.actions;

export default notificationSlice.reducer;
