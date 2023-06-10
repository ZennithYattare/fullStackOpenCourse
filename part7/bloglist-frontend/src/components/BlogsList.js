import { getAll } from "../services/blogs";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../contexts/UserContext";
import Blog from "./Blog";

function BlogsList() {
	const { user } = useUser();

	const {
		data: blogs,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["blogs"],
		queryFn: getAll,
		retry: 5,
		retryDelay: 1000,
		select: (data) => {
			return data.sort((a, b) => b.likes - a.likes);
		},
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return (
			<p>
				Blog service is not available due to problems with the server.{" "}
				<p>Error: {error.message}</p>
			</p>
		);
	}

	return (
		<>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} user={user} />
			))}
		</>
	);
}

export default BlogsList;
