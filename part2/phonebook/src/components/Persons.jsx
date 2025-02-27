/** @format */

import React from "react";

function Persons({ personsToShow, handleDelete }) {
	if (!personsToShow) return null;

	return (
		<div>
			{personsToShow.map((person) => (
				<div key={person.id}>
					{person.name} {person.number}
					<button
						onClick={() => handleDelete(person.id, person.name)}
					>
						delete
					</button>
				</div>
			))}
		</div>
	);
}

export default Persons;
