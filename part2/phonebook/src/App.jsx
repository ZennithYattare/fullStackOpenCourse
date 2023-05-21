/** @format */

import { useState } from "react";

function App() {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const addPerson = (event) => {
		event.preventDefault();
		console.log("button clicked", event.target);

		const personObject = {
			name: newName,
			id: persons.length + 1,
		};

		const nameExists = persons.some((person) => person.name === newName);

		if (nameExists) {
			alert(`${newName} is already added to the phonebook`);
		} else {
			setPersons(persons.concat(personObject));
			setNewName("");
		}
	};

	const handlePersonChange = (event) => {
		console.log(event.target.value);
		setNewName(event.target.value);
	};

	return (
		<div>
			<div>debug: {newName}</div>
			<h2>Phonebook</h2>
			<form onSubmit={addPerson}>
				<div>
					name:{" "}
					<input value={newName} onChange={handlePersonChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<p key={person.name}>{person.name}</p>
			))}
		</div>
	);
}

export default App;
