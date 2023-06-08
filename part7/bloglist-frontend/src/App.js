/** @format */

import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import LoginForm from "./components/Login";
import BlogForm from "./components/BlogForm";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedInUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	useEffect(() => {
		blogService.getAll().then((blogs) => {
			const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
			setBlogs(sortedBlogs);
		});
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

	const handleBlogSubmit = async (newBlog) => {
		try {
			const createdBlog = await blogService.create(newBlog);
			setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);
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

	const handleLike = async (blog) => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1,
		};

		try {
			const returnedBlog = await blogService.update(blog.id, updatedBlog);
			setBlogs((prevBlogs) =>
				prevBlogs.map((b) =>
					b.id === returnedBlog.id ? returnedBlog : b
				)
			);
			setMessage({
				message: `Blog "${blog.title}" liked successfully!`,
				type: "success",
			});
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		} catch (exception) {
			console.error(exception);
			setMessage({ message: "Error updating blog", type: "error" });
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const handleBlogDelete = async (blog) => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)) {
			try {
				await blogService.removeBlog(blog.id);
				setBlogs((prevBlogs) =>
					prevBlogs.filter((b) => b.id !== blog.id)
				);
				setMessage({
					message: `Blog "${blog.title}" deleted successfully!`,
					type: "success",
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			} catch (exception) {
				console.error(exception);
				setMessage({ message: "Error deleting blog", type: "error" });
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			}
		}
	};

	return (
		<div>
			{message && <Notification message={message} />}
			{user === null ? (
				<>
					<h2>Login to application</h2>
					<LoginForm
						handleLogin={handleLogin}
						handleUsernameChange={({ target }) =>
							setUsername(target.value)
						}
						handlePasswordChange={({ target }) =>
							setPassword(target.value)
						}
						username={username}
						password={password}
					/>
				</>
			) : (
				<>
					<h2>Blogs</h2>
					{user && (
						<div>
							<span>{user.name} logged in</span>
							<button id="logoutButton" onClick={handleLogout}>
								Logout
							</button>
						</div>
					)}
					{
						<Togglable buttonLabel="Create new blog">
							<BlogForm handleBlogSubmit={handleBlogSubmit} />
						</Togglable>
					}
					{blogs.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							user={user}
							handleLike={() => handleLike(blog)}
							handleBlogDelete={handleBlogDelete}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default App;
