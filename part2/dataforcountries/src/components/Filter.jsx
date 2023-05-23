/** @format */

import React from "react";

function Filter({ value, onChange }) {
	return (
		<div>
			Find countries <input value={value} onChange={onChange} />
		</div>
	);
}

export default Filter;
