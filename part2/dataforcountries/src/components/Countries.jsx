/** @format */

import React from "react";

function Countries({ filter, countries, handleShowClick }) {
	return (
		<>
			{countries.length > 10 ? (
				!filter ? null : (
					<div>Too many matches, specify another filter</div>
				)
			) : countries.length === 1 ? (
				countries.map((country) => (
					<div key={country.name.common}>
						<h2>{country.name.common}</h2>
						<div>Capital: {country.capital}</div>
						<div>Area: {country.area}</div>
						<h3>Languages:</h3>
						<ul>
							{Object.values(country.languages).map(
								(language) => (
									<li key={language}>{language}</li>
								)
							)}
						</ul>
						<img
							src={country.flags.png}
							alt={`Flag of ${country.name.common}`}
							width="200"
						/>
					</div>
				))
			) : (
				countries.map((country) => (
					<div key={country.name.common}>
						<span>{country.name.common}</span>
						<button
							onClick={() => handleShowClick(country.name.common)}
						>
							show
						</button>
					</div>
				))
			)}
		</>
	);
}

export default Countries;
