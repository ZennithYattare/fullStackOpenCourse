/** @format */

import { useState, useEffect } from "react";
import { useDispatchNotification } from "./contexts/NotificationContext";
import { useQuery } from "@tanstack/react-query";
import Blog from "./components/Blog";
import { getAll, setToken } from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import LoginForm from "./components/Login";
import BlogForm from "./components/BlogForm";

const App = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	const dispatchNotification = useDispatchNotification();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedInUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			setToken(user.token);
		}
	}, []);

	// useEffect(() => {
	// 	blogService.getAll().then((blogs) => {
	// 		const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
	// 		setBlogs(sortedBlogs);
	// 	});
	// }, []);

	const {
		data: blogs,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["blogs"],
		queryFn: getAll,
		retry: 5,
		retryDelay: 1000,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return (
			<p>
				Blog service is not available due to problems with the server.{" "}
				<p>Error: {error.message}</p>
			</p>
		);
	}

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem("loggedInUser", JSON.stringify(user));
			setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: `Logged in successfully as ${user.name}`,
				alert: "success",
			});
		} catch (exception) {
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: "Wrong credentials",
				alert: "error",
			});
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedInUser");
		dispatchNotification({
			type: "SHOW_NOTIFICATION",
			message: "Logged out successfully!",
			alert: "success",
		});
		setUser(null);
	};

	// const handleLike = async (blog) => {
	// 	const updatedBlog = {
	// 		...blog,
	// 		likes: blog.likes + 1,
	// 	};

	// 	try {
	// 		const returnedBlog = await blogService.update(blog.id, updatedBlog);
	// 		setBlogs((prevBlogs) =>
	// 			prevBlogs.map((b) =>
	// 				b.id === returnedBlog.id ? returnedBlog : b
	// 			)
	// 		);
	// 		dispatchNotification({
	// 			type: "SHOW_NOTIFICATION",
	// 			message: `Blog "${blog.title}" liked successfully!`,
	// 			alert: "success",
	// 		});
	// 	} catch (exception) {
	// 		console.error(exception);
	// 		dispatchNotification({
	// 			type: "SHOW_NOTIFICATION",
	// 			message: "Error updating blog",
	// 			alert: "error",
	// 		});
	// 	}
	// };

	// const handleBlogDelete = async (blog) => {
	// 	if (window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)) {
	// 		try {
	// 			await blogService.removeBlog(blog.id);
	// 			setBlogs((prevBlogs) =>
	// 				prevBlogs.filter((b) => b.id !== blog.id)
	// 			);
	// 			dispatchNotification({
	// 				type: "SHOW_NOTIFICATION",
	// 				message: `Blog "${blog.title}" deleted successfully!`,
	// 				alert: "success",
	// 			});
	// 		} catch (exception) {
	// 			console.error(exception);
	// 			dispatchNotification({
	// 				type: "SHOW_NOTIFICATION",
	// 				message: "Error deleting blog",
	// 				alert: "error",
	// 			});
	// 		}
	// 	}
	// };

	return (
		<div>
			<Notification />
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
							<BlogForm />
						</Togglable>
					}
					{blogs.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							user={user}
							// handleLike={() => handleLike(blog)}
							// handleBlogDelete={handleBlogDelete}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default App;
