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
		},
	});

	const onCreate = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		console.log("new anecdote: ", content);
		newAnecdoteMutation.mutate({ content, votes: 0 });
		dispatch({
			type: "SHOW_NOTIFICATION",
			message: `Created new anecdote: ${content}`,
		});
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
