/** @format */

import React from "react";

import Country from "./Country.jsx";

function Countries({ filter, countries, handleShowClick }) {
	return (
		<>
			{countries.length > 10 ? (
				!filter ? null : (
					<div>Too many matches, specify another filter</div>
				)
			) : countries.length === 1 ? (
				<Country country={countries[0]} />
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
