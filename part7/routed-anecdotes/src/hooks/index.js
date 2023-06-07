import { useState } from "react";

export const useField = (type) => {
	const [value, setValue] = useState("");

	const onChange = (event) => {
		setValue(event.target.value);
	};

	// a reset function is added to the hook
	const reset = () => {
		setValue("");
	};

	return {
		type,
		value,
		onChange,
		reset,
	};
};
