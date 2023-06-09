/** @format */

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import loginService from "../services/login";
import { useDispatchNotification } from "../contexts/NotificationContext";
import { useDispatchUser } from "../contexts/UserContext";
import { setToken } from "../services/blogs";

// * DONE : 7.13 - Refactor to use useReducer-hook and context to manage the data for the logged in user.
const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const dispatchNotification = useDispatchNotification();
	const dispatchUser = useDispatchUser();

	const loginMutation = useMutation({
		mutationFn: loginService.login,
		onSuccess: (user) => {
			dispatchUser({ type: "LOGIN", user: user, token: user.token });
			window.localStorage.setItem("loggedInUser", JSON.stringify(user));
			setToken(user.token);
			setUsername("");
			setPassword("");
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: `Logged in successfully as ${user.name}`,
				alert: "success",
			});
		},
		onError: () => {
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: "Wrong credentials",
				alert: "error",
			});
		},
	});

	const handleUsernameChange = ({ target }) => setUsername(target.value);
	const handlePasswordChange = ({ target }) => setPassword(target.value);

	const handleLogin = async (event) => {
		event.preventDefault();
		loginMutation.mutate({ username, password });
	};

	return (
		<form onSubmit={handleLogin}>
			<div>
				<label htmlFor="username">Username: </label>
				<input
					id="username"
					type="text"
					value={username}
					name="Username"
					onChange={handleUsernameChange}
				/>
			</div>
			<div>
				<span htmlFor="password">Password: </span>
				<input
					id="password"
					type="password"
					value={password}
					name="Password"
					onChange={handlePasswordChange}
				/>
			</div>
			<button id="loginButton" type="submit">
				Login
			</button>
		</form>
	);
};

export default LoginForm;
