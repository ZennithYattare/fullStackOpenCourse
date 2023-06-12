import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../services/blogs";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Comments = ({ comments }) => {
	const [commentState, setCommentState] = useState("");
	const id = useParams().id;

	const queryClient = useQueryClient();

	const addCommentMutation = useMutation({
		mutationFn: addComment,
		onSuccess: (data) => {
			queryClient.setQueryData(["blog", data.id], data);
			queryClient.invalidateQueries("blog");
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const handleCommentSubmit = (event) => {
		event.preventDefault();
		addCommentMutation.mutate({ id: id, comment: commentState });
		setCommentState("");
	};

	const handleCommentChange = (event) => {
		setCommentState(event.target.value);
	};

	return (
		<div>
			<h3>Comments</h3>
			<form onSubmit={handleCommentSubmit}>
				<input
					type="text"
					value={commentState}
					onChange={handleCommentChange}
				/>
				<button type="submit" disabled={!commentState}>
					Add comment
				</button>
			</form>

			<ul>
				{comments.length > 0 ? (
					<ul>
						{comments.map((comment) => (
							<li key={comment.id}>{comment.content}</li>
						))}
					</ul>
				) : (
					<p>No comments yet.</p>
				)}
			</ul>
		</div>
	);
};

export default Comments;
