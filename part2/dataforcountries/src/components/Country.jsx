/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";

function Country({ country }) {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		const apiKey = import.meta.env.VITE_API_KEY;
		const lat = country.latlng[0];
		const lon = country.latlng[1];
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

		axios
			.get(url)
			.then((response) => setWeather(response.data))
			.catch((error) => console.log(error));
	}, [country]);

	return (
		<div>
			<h2>{country.name.common}</h2>
			<div>Capital: {country.capital[0]}</div>
			<div>Area: {country.area} km²</div>
			<h3>Languages:</h3>
			<ul>
				{Object.values(country.languages).map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img
				src={country.flags.png}
				alt={`Flag of ${country.name.common}`}
				width="200"
			/>
			{weather && (
				<div>
					<h3>Weather in {country.capital[0]}</h3>
					<div>
						Temperature: {(weather.main.temp - 273.15).toFixed(1)}{" "}
						°C
					</div>
					<div>
						<img
							src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
							alt={weather.weather[0].description}
						/>
					</div>
					<div>Wind: {weather.wind.speed} m/s</div>
					<div>Description: {weather.weather[0].description}</div>
				</div>
			)}
		</div>
	);
}

export default Country;
