import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: null,
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

export const setNotificationWithDuration = (message, duration) => {
	return (dispatch) => {
		dispatch(setNotification(message));
		setTimeout(() => {
			dispatch(removeNotification());
		}, duration * 1000);
	};
};

export default notificationSlice.reducer;
