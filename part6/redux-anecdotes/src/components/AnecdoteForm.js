import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationWithDuration } from "../reducers/notificationReducer";

function AnecdoteForm() {
	const dispatch = useDispatch();

	const addAnecdoteSubmit = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		console.log("addAnecdote", content);
		dispatch(createAnecdote(content));
		dispatch(setNotificationWithDuration(`You added: '${content}'`, 5));
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
