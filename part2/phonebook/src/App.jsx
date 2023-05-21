/** @format */

import { useState } from "react";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";

function App() {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);

	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	const addPerson = (event) => {
		event.preventDefault();
		// console.log("button clicked", event.target);

		const personObject = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};

		const nameExists = persons.some((person) => person.name === newName);

		if (nameExists) {
			alert(`${newName} is already added to the phonebook`);
		} else {
			setPersons(persons.concat(personObject));
			setNewNumber("");
			setNewName("");
		}
	};

	const handlePersonChange = (event) => {
		// console.log(event.target.value);
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		// console.log(event.target.value);
		setNewNumber(event.target.value);
	};

	const handleFilterChange = (event) => {
		// console.log(event.target.value);
		setFilter(event.target.value);
	};

	const personsToShow = filter
		? persons.filter((person) =>
				person.name.toLowerCase().includes(filter.toLowerCase())
		  )
		: persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} handleFilterChange={handleFilterChange} />
			<h3>Add a new</h3>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				handlePersonChange={handlePersonChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h3>Numbers</h3>
			<Persons personsToShow={personsToShow} />
		</div>
	);
}

export default App;
