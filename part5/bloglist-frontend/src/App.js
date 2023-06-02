/** @format */

import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);
	const [newBlog, setNewBlog] = useState({
		title: "",
		author: "",
		url: "",
	});

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedInUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
		}
	}, []);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem("loggedInUser", JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
			setMessage({ message: "Logged in successfully!", type: "success" });
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		} catch (exception) {
			setMessage({ message: "Wrong credentials", type: "error" });
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedInUser");
		setMessage({ message: "Logged out successfully!", type: "success" });
		setTimeout(() => {
			setMessage(null);
		}, 5000);
		setUser(null);
	};

	const handleBlogChange = (event) => {
		const { name, value } = event.target;
		setNewBlog((prevBlog) => ({
			...prevBlog,
			[name]: value,
		}));
	};

	const handleBlogSubmit = async (event) => {
		event.preventDefault();

		try {
			const createdBlog = await blogService.create(newBlog);
			setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);
			setNewBlog({
				title: "",
				author: "",
				url: "",
			});
			setMessage({
				message: `Blog "${newBlog.title}" created successfully!`,
				type: "success",
			});
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		} catch (exception) {
			console.error(exception);
			setMessage({ message: "Error creating blog", type: "error" });
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<h2>Login to application</h2>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);

	const blogForm = () => (
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

	return (
		<div>
			{message && <Notification message={message} />}
			{user === null ? (
				loginForm()
			) : (
				<>
					<h2>Blogs</h2>
					{user && (
						<div>
							<span>{user.name} logged in</span>
							<button onClick={handleLogout}>logout</button>
						</div>
					)}
					{blogForm()}
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</>
			)}
		</div>
	);
};

export default App;
