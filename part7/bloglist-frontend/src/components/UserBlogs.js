import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/users";
import { useParams } from "react-router-dom";

const UserBlogs = () => {
	const id = useParams().id;
	console.log("params: ", id);
	const {
		data: user,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["user", id],
		queryFn: () => getUser(id),
		retry: 5,
		retryDelay: 1000,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return (
			<p>
				Users were not loaded due to problems with the server.{" "}
				<p>Error: {error.message}</p>
			</p>
		);
	}

	console.log("User: ", user);

	return (
		<div>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<ul>
				{user.blogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	);
};

export default UserBlogs;
