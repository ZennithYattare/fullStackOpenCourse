/** @format */

import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

export const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

export const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

export const create = async (newObject) => {
	const config = { headers: { Authorization: token } };
	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

export const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

export const removeBlog = (id) => {
	const config = { headers: { Authorization: token } };
	const request = axios.delete(`${baseUrl}/${id}`, config);

	return request.then((response) => response.data);
};

// export default { getAll, create, update, removeBlog, setToken };
