/** @format */

// FOR FUTURE REFERENCE: Commented out the .catch() blocks in the functions below as errors were being caught here instead of in App.jsx.
// What happend was: persons.jsx will catch the error, message: "Request failed with status code 400", since it failed to create the data--React will try to access and render non-existent data, which will cause an error in Persons.jsx.
// Uncaught TypeError: can't access property "name", person is undefined -- Persons.jsx:12:6
// Uncaught TypeError: can't access property "name", person is undefined -- Persons.jsx:12:6
// I think it will keep trying again and again, which is why the error message keeps repeating. It repeated three times before moving on to the next error message.
// Uncaught (in promise) TypeError: can't access property "data", error.response is undefined -- App.jsx:92:5
// I think it was undefined because the error was caught in persons.jsx, so it didn't have a chance to be caught in App.jsx causing it to be undefined.

import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject);
	return request.then((response) => response.data);
};

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

const deletePerson = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then((response) => response.data);
};

export default {
	getAll,
	create,
	update,
	deletePerson,
};
