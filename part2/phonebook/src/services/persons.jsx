/** @format */

import axios from "axios";
const baseUrl = "https://phonebook-backend-4ils.onrender.com/api/persons";

const getAll = () => {
	const request = axios.get(baseUrl);
	return request
		.then((response) => response.data)
		.catch((error) => console.log(error.toJSON()));
};

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject);
	return request
		.then((response) => response.data)
		.catch((error) => console.log(error.toJSON()));
};

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request
		.then((response) => response.data)
		.catch((error) => console.log(error.toJSON()));
};

const deletePerson = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request
		.then((response) => response.data)
		.catch(() => alert("Data to be deleted does not exist."));
};

export default {
	getAll,
	create,
	update,
	deletePerson,
};
