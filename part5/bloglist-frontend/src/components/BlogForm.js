/** @format */

const BlogForm = ({ handleBlogSubmit, handleBlogChange, newBlog }) => (
	<form onSubmit={handleBlogSubmit}>
		<div>
			<label htmlFor="title">Title:</label>
			<input
				type="text"
				name="title"
				value={newBlog.title}
				onChange={handleBlogChange}
			/>
		</div>
		<div>
			<label htmlFor="author">Author:</label>
			<input
				type="text"
				name="author"
				value={newBlog.author}
				onChange={handleBlogChange}
			/>
		</div>
		<div>
			<label htmlFor="url">URL:</label>
			<input
				type="text"
				name="url"
				value={newBlog.url}
				onChange={handleBlogChange}
			/>
		</div>
		<button type="submit">Create</button>
	</form>
);

export default BlogForm;
