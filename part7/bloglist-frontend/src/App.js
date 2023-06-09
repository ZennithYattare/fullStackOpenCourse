/** @format */

import { useEffect } from "react";
import { useDispatchNotification } from "./contexts/NotificationContext";
import { useQuery } from "@tanstack/react-query";
import Blog from "./components/Blog";
import { getAll, setToken } from "./services/blogs";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import LoginForm from "./components/Login";
import BlogForm from "./components/BlogForm";
import { useUser, useDispatchUser } from "./contexts/UserContext";

const App = () => {
	const dispatchNotification = useDispatchNotification();
	const dispatchUser = useDispatchUser();
	const { user } = useUser();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedInUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			dispatchUser({ type: "LOGIN", user: user, token: user.token });
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

	const handleLogout = () => {
		window.localStorage.removeItem("loggedInUser");
		dispatchUser({ type: "LOGOUT" });
		dispatchNotification({
			type: "SHOW_NOTIFICATION",
			message: "Logged out successfully!",
			alert: "success",
		});
	};

	return (
		<div>
			<Notification />
			{user === null ? (
				<>
					<h2>Login to application</h2>
					<LoginForm />
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
						<Blog key={blog.id} blog={blog} user={user} />
					))}
				</>
			)}
		</div>
	);
};

export default App;
