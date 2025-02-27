import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationWithDuration } from "../reducers/notificationReducer";

function AnecdoteList() {
	const dispatch = useDispatch();
	const anecdotes = useSelector(({ filter, anecdotes }) => {
		return anecdotes.filter((anecdote) =>
			anecdote.content.toLowerCase().includes(filter.toLowerCase())
		);
	});

	const vote = (anecdote) => {
		console.log("vote", anecdote);
		dispatch(voteAnecdote(anecdote));
		const id = anecdote.id;
		const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
		dispatch(
			setNotificationWithDuration(
				`You voted for: '${votedAnecdote.content}'`,
				5
			)
		);
	};
	// console.log("anecdotes", anecdotes);

	return (
		<>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</>
	);
}

export default AnecdoteList;
