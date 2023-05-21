/** @format */

const Header = ({ course }) => {
	return <h1>{course.name}</h1>;
};

const Content = ({ parts }) => {
	const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

	return (
		<div>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
			<p>
				<strong>total of {totalExercises} exercises</strong>
			</p>
		</div>
	);
};

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const Course = ({ courses }) => {
	return (
		<div>
			{courses.map((course) => (
				<div key={course.id}>
					<Header course={course} />
					<Content parts={course.parts} />
				</div>
			))}
		</div>
	);
};

export default Course;
