import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";
import {
	setNotification,
	removeNotification,
} from "../reducers/notificationReducer";

function AnecdoteList() {
	const dispatch = useDispatch();
	const anecdotes = useSelector(({ filter, anecdotes }) => {
		return anecdotes.filter((anecdote) =>
			anecdote.content.toLowerCase().includes(filter.toLowerCase())
		);
	});

	const vote = (id) => {
		console.log("vote", id);
		dispatch(incrementVote(id));
		const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
		notification(`You voted for: '${votedAnecdote.content}'`);
	};

	const notification = (content) => {
		dispatch(setNotification(content));
		setTimeout(() => {
			dispatch(removeNotification());
		}, 5000);
	};

	// console.log("anecdotes", anecdotes);

	return (
		<>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</>
	);
}

export default AnecdoteList;
