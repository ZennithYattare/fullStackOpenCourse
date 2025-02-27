import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const createNew = async (content) => {
	const votes = 0;
	const object = { content, votes };
	const response = await axios.post(baseUrl, object);

	return response.data;
};

const update = async (newObject) => {
	const id = newObject.id;
	const response = await axios.put(`${baseUrl}/${id}`, newObject);
	return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, update };
