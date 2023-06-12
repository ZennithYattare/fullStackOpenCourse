import { GET_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Books = () => {
	const result = useQuery(GET_BOOKS);

	if (result.loading) {
		return <div>loading...</div>;
	}

	const books = result.data.allBooks;

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th style={{ textAlign: "left" }}>author</th>
						<th style={{ textAlign: "left" }}>published</th>
					</tr>
					{books.map((a) => (
						<tr key={a.id}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Books;
