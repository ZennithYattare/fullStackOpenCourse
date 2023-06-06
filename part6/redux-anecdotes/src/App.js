/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeAnecdotes());
	}, [dispatch]);

	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<Filter />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	);
};

export default App;
