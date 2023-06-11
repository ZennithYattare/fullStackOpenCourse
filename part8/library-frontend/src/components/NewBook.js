import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_BOOKS, GET_AUTHORS, ADD_BOOK } from "../queries";

const NewBook = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState("");
	const [genre, setGenre] = useState("");
	const [genres, setGenres] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	const [addBook] = useMutation(ADD_BOOK, {
		refetchQueries: [{ query: GET_BOOKS }, { query: GET_AUTHORS }],
		onError: (error) => {
			setErrorMessage(error.graphQLErrors[0].message);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		},
	});

	const submit = async (event) => {
		event.preventDefault();

		console.log("add book...");

		addBook({
			variables: {
				title,
				author,
				published: parseInt(published),
				genres,
			},
		});

		setTitle("");
		setPublished("");
		setAuthor("");
		setGenres([]);
		setGenre("");
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre("");
	};

	return (
		<div>
			{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type="number"
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(" ")}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	);
};

export default NewBook;
