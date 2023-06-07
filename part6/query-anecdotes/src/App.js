import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery } from "react-query";
import { getAnecdotes } from "./requests";

const App = () => {
	const handleVote = (anecdote) => {
		console.log("vote");
	};

	const {
		data: anecdotes,
		isLoading,
		isError,
		error,
	} = useQuery("anecdotes", getAnecdotes, {
		retry: 3,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return (
			<p>
				Anecdote service not available due to problems in server.{" "}
				<p>Error: {error.message}</p>
			</p>
		);
	}

	console.log("anecdotes:", anecdotes);

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
