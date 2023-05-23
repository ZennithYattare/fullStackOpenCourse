/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter.jsx";
import Countries from "./components/Countries.jsx";

function App() {
	const [countries, setCountries] = useState([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		axios
			.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((response) => setCountries(response.data))
			.catch((error) => console.log(error));
	}, []);

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const filteredCountries = countries.filter((country) =>
		country.name.common.toLowerCase().includes(filter.toLowerCase())
	);

	const handleShowClick = (name) => {
		setFilter(name);
	};

	return (
		<div>
			<h1>Countries</h1>
			<Filter value={filter} onChange={handleFilterChange} />
			<Countries
        filter={filter}
				countries={filteredCountries}
				handleShowClick={handleShowClick}
			/>
		</div>
	);
}

export default App;
