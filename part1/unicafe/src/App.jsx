/** @format */

import { useState } from "react";

function App() {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h2>give feedback</h2>

			<button onClick={() => setGood(good + 1)}>good</button>
			<button onClick={() => setNeutral(neutral + 1)}>neutral</button>
			<button onClick={() => setBad(bad + 1)}>bad</button>

			<h2>statistics</h2>
			<p>Good: {good}</p>
			<p>Neutral: {neutral}</p>
			<p>Bad: {bad}</p>
			<p>All: {good + neutral + bad}</p>
			<p>Average: {(good - bad) / (good + neutral + bad)}</p>
			<p>Positive: {(good / (good + neutral + bad)) * 100}%</p>
		</div>
	);
}

export default App;
