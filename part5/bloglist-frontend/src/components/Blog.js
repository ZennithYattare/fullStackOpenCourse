/** @format */

import React, { useState } from "react";

const Blog = ({ blog, user, handleLike, handleBlogDelete }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const [showDetails, setShowDetails] = useState(false);

	const toggleDetails = () => {
		setShowDetails(!showDetails);
	};

	const handleDelete = () => {
		if (user && user.username === blog.user.username) {
			return (
				<button onClick={() => handleBlogDelete(blog)}>delete</button>
			);
		}
	};

	return (
		<div data-testid="blogsList" style={blogStyle}>
			<div>
				<p>
					{blog.title} - {blog.author}
				</p>
				<button data-testid="viewButton" onClick={toggleDetails}>
					{showDetails ? "hide" : "view"}
				</button>
			</div>
			{showDetails && (
				<div>
					<a href={blog.url}>{blog.url}</a>
					<p>
						likes {blog.likes}{" "}
						<button data-testid="likeButton" onClick={handleLike}>
							Like
						</button>
					</p>
					<p>{blog.user.name}</p>
					{handleDelete()}
				</div>
			)}
		</div>
	);
};

export default Blog;
