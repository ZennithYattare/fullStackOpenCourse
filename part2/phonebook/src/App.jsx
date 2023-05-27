/** @format */

import { useState, useEffect } from "react";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import Notification from "./components/Notification.jsx";

import personService from "./services/persons.jsx";

function App() {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [message, setMessage] = useState(null);

	useEffect(() => {
		console.log("effect");
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();
		// console.log("button clicked", event.target);

		const personObject = {
			name: newName,
			number: newNumber,
		};

		const nameExists = persons.some((person) => person.name === newName);

		if (nameExists) {
			window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			) &&
				personService
					.update(
						persons.find((person) => person.name === newName).id,
						personObject
					)
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id !== returnedPerson.id
									? person
									: returnedPerson
							)
						);
						// setMessage object with message and type instead of using useState for message and type separately
						setMessage({
							message: `Updated ${returnedPerson.name}.`,
							type: "success",
						});
						setTimeout(() => {
							setMessage(null);
						}, 5000);
						setNewNumber("");
						setNewName("");
					})
					.catch(() => {
						setMessage({
							message: `Information of ${newName} has already been removed from server.`,
							type: "error",
						});
						setTimeout(() => {
							setMessage(null);
						}, 5000);
						setPersons(
							persons.filter((person) => person.name !== newName)
						);
					});
		} else {
			personService
				.create(personObject)
				.then((returnedPerson) => {
					setPersons(persons.concat(returnedPerson));
					setMessage({
						message: `Added ${returnedPerson.name}.`,
						type: "success",
					});
					setTimeout(() => {
						setMessage(null);
					}, 5000);
					setNewNumber("");
					setNewName("");
				})
				.catch((error) => {
					console.log(error.response.data);
					setMessage({
						message:
							error.response.data.error || "Validation error",
						type: "error",
					});
					setTimeout(() => {
						setMessage(null);
					}, 5000);
				});
		}
	};

	const handleDelete = (id, name) => {
		if (window.confirm(`Delete ${name}?`)) {
			personService
				.deletePerson(id)
				.then(() => {
					setPersons(
						personsToShow.filter((person) => person.id !== id)
					);
					setMessage({
						message: `Deleted ${name}.`,
						type: "success",
					});
					setTimeout(() => {
						setMessage(null);
					}, 5000);
				})
				.catch(() => {
					setMessage({
						message: `Information of ${name} has already been removed from server.`,
						type: "error",
					});
					setTimeout(() => {
						setMessage(null);
					}, 5000);
					setPersons(
						persons.filter((person) => person.name !== name)
					);
				});
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
			<Notification message={message} />
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
			<Persons
				personsToShow={personsToShow}
				handleDelete={handleDelete}
			/>
		</div>
	);
}

export default App;
