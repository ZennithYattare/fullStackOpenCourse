/** @format */

import React, { useState } from "react";

const Blog = ({ blog, user, handleLike }) => {
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

	return (
		<div style={blogStyle}>
			<div>
				{blog.title} {blog.author}{" "}
				<button onClick={toggleDetails}>
					{showDetails ? "hide" : "view"}
				</button>
			</div>
			{showDetails && (
				<div>
					<a href={blog.url}>{blog.url}</a>
					<p>
						likes {blog.likes}{" "}
						<button onClick={handleLike}>Like</button>
					</p>
					<p>{blog.user.name}</p>
					{user && user.username === blog.user.username && (
						<button>delete</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Blog;
