/** @format */

import { useEffect } from "react";
import { useDispatchNotification } from "./contexts/NotificationContext";
import { useUser, useDispatchUser } from "./contexts/UserContext";
import { setToken } from "./services/blogs";
import { Routes, Route } from "react-router-dom";

import LoginForm from "./components/Login";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import BlogsList from "./components/BlogsList";
import BlogForm from "./components/BlogForm";
import BlogPage from "./components/BlogPage";
import Users from "./components/Users";
import UserBlogs from "./components/UserBlogs";

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
					<Routes>
						<Route path="/" element={<BlogsList />} />
						<Route path="/blogs/:id" element={<BlogPage />} />
						<Route path="/users" element={<Users />} />
						<Route path="/users/:id" element={<UserBlogs />} />
					</Routes>
				</>
			)}
		</div>
	);
};

export default App;
