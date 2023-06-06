import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		addAnecdote: (state, action) => {
			console.log("state", state);
			console.log("action", action);
			state.push(action.payload);
		},
		incrementVote: (state, action) => {
			console.log("state", state);
			console.log("action", action);
			const id = action.payload;
			const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
			anecdoteToVote.votes++;
			state.sort((a, b) => b.votes - a.votes);
		},
		appendAnecdotes: (state, action) => {
			console.log("state", state);
			console.log("action", action);
			state.push(action.payload);
		},
		setAnecdotes: (state, action) => {
			console.log("state", state);
			console.log("action", action);
			return action.payload;
		},
	},
});

export const { addAnecdote, incrementVote, appendAnecdotes, setAnecdotes } =
	anecdoteSlice.actions;

export default anecdoteSlice.reducer;
