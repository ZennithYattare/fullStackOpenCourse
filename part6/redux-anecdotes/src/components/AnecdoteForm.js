import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import {
	setNotification,
	removeNotification,
} from "../reducers/notificationReducer";

function AnecdoteForm() {
	const dispatch = useDispatch();

	const addAnecdoteSubmit = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		console.log("addAnecdote", content);
		dispatch(addAnecdote(content));
		notification(`You added: '${content}'`);
	};

	const notification = (content) => {
		dispatch(setNotification(content));
		setTimeout(() => {
			dispatch(removeNotification());
		}, 5000);
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdoteSubmit}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
}

export default AnecdoteForm;
