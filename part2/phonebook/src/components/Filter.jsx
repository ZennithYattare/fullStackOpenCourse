/** @format */

import React from "react";

function Filter({ filter, handleFilterChange }) {
	return (
		<div>
			filter shown with{" "}
			<input value={filter} onChange={handleFilterChange} />
		</div>
	);
}

export default Filter;
