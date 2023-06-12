import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";

const App = () => {
	const [token, setToken] = useState(null);
	const client = useApolloClient();

	useEffect(() => {
		const userToken = window.localStorage.getItem("user-token");
		console.log(userToken);
		if (userToken) {
			setToken(userToken);
		}
	}, []);

	const padding = {
		padding: 5,
	};

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	console.log(token);

	return (
		<div>
			<div>
				<Link style={padding} to="/">
					authors
				</Link>
				<Link style={padding} to="/books">
					books
				</Link>
				<Link style={padding} to="/add">
					add book
				</Link>
				{token ? (
					<Link style={padding} onClick={logout}>
						logout
					</Link>
				) : (
					<Link style={padding} to="/login">
						login
					</Link>
				)}
			</div>

			<Routes>
				<Route path="/" element={<Authors />} />
				<Route path="/books" element={<Books />} />
				<Route path="/add" element={<NewBook />} />
				<Route
					path="/login"
					element={<LoginForm setToken={setToken} />}
				/>
			</Routes>
		</div>
	);
};

export default App;
