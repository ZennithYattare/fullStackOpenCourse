import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useDispatchNotification } from "../NotificationContext";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();
	const dispatch = useDispatchNotification();

	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: (newAnecdote) => {
			queryClient.setQueryData("anecdotes", (old) => [
				...old,
				newAnecdote,
			]);
			console.log(newAnecdote);
			dispatch({
				type: "SHOW_NOTIFICATION",
				message: `Created new anecdote: ${newAnecdote.content}`,
			});
		},
		onError: (error) => {
			if (
				error.message === "content must be at least 5 characters long"
			) {
				dispatch({
					type: "SHOW_NOTIFICATION",
					message:
						"Anecdote content must be at least 5 characters long.",
				});
			} else {
				dispatch({
					type: "SHOW_NOTIFICATION",
					message: "An error occurred while creating the anecdote.",
				});
			}
		},
	});

	const onCreate = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		console.log("new anecdote: ", content);
		newAnecdoteMutation.mutate({ content, votes: 0 });
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
