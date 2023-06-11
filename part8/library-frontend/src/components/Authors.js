import { GET_AUTHORS, UPDATE_AUTHOR_BORN } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const Authors = () => {
	const [name, setName] = useState("");
	const [born, setBorn] = useState("");

	const result = useQuery(GET_AUTHORS);

	const [updateAuthorBorn] = useMutation(UPDATE_AUTHOR_BORN, {
		refetchQueries: [{ query: GET_AUTHORS }],
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!name || !born) {
			return;
		}
		updateAuthorBorn({ variables: { name, born } });
		setName("");
		setBorn("");
	};

	const handleBornChange = (event) => {
		const born = parseInt(event.target.value);
		setBorn(born);
	};

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	if (result.loading) {
		return <div>loading...</div>;
	}

	const authors = result.data.allAuthors;

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<h2>Set birth year</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label>Name</label>
						<select value={name} onChange={handleNameChange}>
							<option value="">Select an author</option>
							{authors.map((author) => (
								<option key={author.name} value={author.name}>
									{author.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<label>Born</label>
						<input
							type="number"
							value={born}
							onChange={handleBornChange}
						/>
					</div>
					<button type="submit">Update author</button>
				</form>
			</div>
		</div>
	);
};

export default Authors;
