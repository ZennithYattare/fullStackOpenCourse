const Comments = ({ comments }) => {
	return (
		<div>
			<h3>Comments</h3>
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
