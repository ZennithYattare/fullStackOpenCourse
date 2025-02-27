/** @format */
/* eslint-disable */

import { useState } from "react";

const BlogForm = ({ handleBlogSubmit }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

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
			<button id="blogFormSubmitButton" type="submit">Create</button>
		</form>
	);
};

export default BlogForm;
