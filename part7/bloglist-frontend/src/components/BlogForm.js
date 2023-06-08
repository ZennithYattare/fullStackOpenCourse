import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "../services/blogs";
import { useDispatchNotification } from "../contexts/NotificationContext";

const BlogForm = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const queryClient = useQueryClient();
	const dispatchNotification = useDispatchNotification();

	const createBlogMutation = useMutation({
		mutationFn: create,
		onSuccess: (newBlog) => {
			queryClient.setQueryData(["blogs", newBlog.id], newBlog);
			queryClient.invalidateQueries("blogs");
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: `Blog "${newBlog.title}" created successfully!`,
				alert: "success",
			});
		},
		onError: (error) => {
			console.error(error);
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: "Error creating blog",
				alert: "error",
			});
		},
	});

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const handleAuthorChange = (event) => {
		setAuthor(event.target.value);
	};

	const handleUrlChange = (event) => {
		setUrl(event.target.value);
	};

	const addBlog = async (event) => {
		event.preventDefault();
		handleBlogSubmit({ title: title, author: author, url: url });

		setTitle("");
		setAuthor("");
		setUrl("");
	};

	const handleBlogSubmit = async (newBlog) => {
		createBlogMutation.mutate(newBlog);
	};

	return (
		<form id="blogForm" onSubmit={addBlog}>
			<div>
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					name="title"
					value={title}
					onChange={handleTitleChange}
					id="blogFormTitle"
				/>
			</div>
			<div>
				<label htmlFor="author">Author:</label>
				<input
					type="text"
					name="author"
					value={author}
					onChange={handleAuthorChange}
					id="blogFormAuthor"
				/>
			</div>
			<div>
				<label htmlFor="url">URL:</label>
				<input
					type="text"
					name="url"
					value={url}
					onChange={handleUrlChange}
					id="blogFormUrl"
				/>
			</div>
			<button id="blogFormSubmitButton" type="submit">
				Create
			</button>
		</form>
	);
};

export default BlogForm;
