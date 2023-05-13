/** @format */

const Header = (props) => {
	return <h1>{props.course}</h1>;
};

const Part = (props) => {
	return (
		<>
			<p>
				{props.parts.name} {props.parts.exercises}
			</p>
		</>
	);
};

const Content = (props) => {
	return (
		<>
			<Part parts={props.parts[0]} />
			<Part parts={props.parts[1]} />
			<Part parts={props.parts[2]} />
		</>
	);
};

const Total = (props) => {
	// add the total of exercises
	let total = 0;

	for (let i = 0; i < props.parts.length; i++) {
		total += props.parts[i].exercises;
	}

	return (
		<>
			<p>Number of exercises {total}</p>
		</>
	);
};

function App() {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
}

export default App;
