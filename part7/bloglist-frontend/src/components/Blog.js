/** @format */

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatchNotification } from "../contexts/NotificationContext";
import { update, removeBlog } from "../services/blogs";

const Blog = ({ blog, user }) => {
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

	const queryClient = useQueryClient();
	const dispatchNotification = useDispatchNotification();

	//  * DONE: 7.12 - Expand your solution so that it is again possible to like and delete a blog.
	const updateBlogMutation = useMutation({
		mutationFn: update,
		onSuccess: (data) => {
			queryClient.setQueryData(["blogs", data.id], data);
			queryClient.invalidateQueries("blogs");
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: `Blog "${data.title}" updated successfully!`,
				alert: "success",
			});
		},
		onError: (error) => {
			console.error(error);
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: "Error updating blog",
				alert: "error",
			});
		},
	});

	const handleLike = async (blog) => {
		updateBlogMutation.mutate({
			...blog,
			likes: blog.likes + 1,
		});
	};

	const deleteBlogMutation = useMutation({
		mutationFn: removeBlog,
		onSuccess: (data) => {
			queryClient.removeQueries(["blogs", data.id]);
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: `Blog "${data.title}" deleted successfully!`,
				alert: "success",
			});
		},
		onError: (error) => {
			console.error(error);
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: "Error deleting blog",
				alert: "error",
			});
		},
	});

	const handleBlogDelete = async (blog) => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)) {
			deleteBlogMutation.mutate(blog);
		}
	};

	const deleteBlogButton = () => {
		if (user && user.username === blog.user.username) {
			return (
				<button
					id="blogDeleteButton"
					onClick={() => handleBlogDelete(blog)}
				>
					Delete
				</button>
			);
		}
	};

	return (
		<div data-testid="blogsList" className="blog" style={blogStyle}>
			<div>
				<p>
					{blog.title} - {blog.author}
				</p>
				<button data-testid="viewButton" onClick={toggleDetails}>
					{showDetails ? "Hide" : "View"}
				</button>
			</div>
			{showDetails && (
				<div>
					<a href={blog.url}>{blog.url}</a>
					<p>
						Likes: {blog.likes}{" "}
						<button
							data-testid="likeButton"
							onClick={() => handleLike(blog)}
						>
							Like
						</button>
					</p>
					<p>{blog.user.name}</p>
					{deleteBlogButton()}
				</div>
			)}
		</div>
	);
};

export default Blog;
