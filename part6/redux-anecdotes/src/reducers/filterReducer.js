const filterReducer = (state = "", action) => {
	switch (action.type) {
		case "FILTER_ANECDOTES":
			return action.data.searchTerm;
		default:
			return state;
	}
};

export const filterAnecdotes = (searchTerm) => {
	return {
		type: "FILTER_ANECDOTES",
		data: { searchTerm },
	};
};

export default filterReducer;
