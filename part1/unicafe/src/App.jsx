/** @format */

import { useState } from "react";

const Statistics = ({ good, bad, neutral }) => {
	const total = good + neutral + bad;
	const average = (good - bad) / total;
	const positive = (good / total) * 100;

	return (
		<table>
			<tbody>
				{/* StatisticLine */}
				<StatisticLine text="Good" value={good} />
				<StatisticLine text="Neutral" value={neutral} />
				<StatisticLine text="Bad" value={bad} />

				{/* Total */}
				<StatisticLine text="All" value={total} />

				{/* Average */}
				<StatisticLine text="Average" value={average} />

				{/* Positive */}
				<StatisticLine text="Positive" value={positive} />
			</tbody>
		</table>
	);
};

const StatisticLine = (props) => {
	return (
		<tr>
			<td>{props.text}</td>
			<td>{props.value}</td>
		</tr>
	);
};

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
};

function App() {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h2>give feedback</h2>

			<Button onClick={() => setGood(good + 1)} text="good" />
			<Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
			<Button onClick={() => setBad(bad + 1)} text="bad" />

			<h2>statistics</h2>

			{!good && !neutral && !bad ? (
				<p>No feedback given</p>
			) : (
				<Statistics good={good} neutral={neutral} bad={bad} />
			)}
		</div>
	);
}

export default App;
