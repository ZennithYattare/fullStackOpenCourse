import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		appendAnecdote: (state, action) => {
			console.log("state", state);
			console.log("action", action);
			state.push(action.payload);
		},
		setAnecdotes: (state, action) => {
			console.log("state", state);
			console.log("action", action);
			const sortedAnecdotes = action.payload.sort(
				(a, b) => b.votes - a.votes
			);
			return sortedAnecdotes;
		},
	},
});

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(appendAnecdote(newAnecdote));
	};
};

export const voteAnecdote = (anecdote) => {
	return async (dispatch) => {
		const updatedAnecdote = {
			...anecdote,
			votes: anecdote.votes + 1,
		};
		await anecdoteService.update(updatedAnecdote);
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export default anecdoteSlice.reducer;
