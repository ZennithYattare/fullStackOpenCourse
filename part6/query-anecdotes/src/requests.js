import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

export const createAnecdote = async (anecdote) => {
	// if anecdote.content.length < 5, throw error
	if (anecdote.content.length < 5) {
		throw new Error("Anecdote content must be at least 5 characters long");
	}

	const response = await axios.post(baseUrl, anecdote);
	return response.data;
};
