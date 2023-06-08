/** @format */

import PropTypes from "prop-types";

const LoginForm = ({
	handleLogin,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password,
}) => (
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

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
};

export default LoginForm;
