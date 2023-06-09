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

	/*
		TODO: 7.13 - Refactor to use useReducer-hook and context to manage the data for the logged in user.
	*/
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedInUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			setToken(user.token);
		}
	}, []);

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
		select: (data) => {
			return data.sort((a, b) => b.likes - a.likes);
		},
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

	/*
		TODO: 7.13 - Refactor to use useReducer-hook and context to manage the data for the logged in user.
	*/
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
						/>
					))}
				</>
			)}
		</div>
	);
};

export default App;
