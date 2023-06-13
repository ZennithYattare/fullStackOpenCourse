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
		<div className="mx-auto max-w-screen-xl px-4 md:px-8">
			<div className="max-w-lg">
				<h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
					Blogs
				</h3>
				<p className="mt-2 text-gray-600">Create new blog</p>
			</div>
			<div
				data-testid="blogsList"
				className="blog mt-12 overflow-x-auto rounded-lg border shadow-sm"
			>
				<table className="w-full table-auto text-left text-sm">
					<thead className="border-b bg-gray-50 font-medium text-gray-600">
						<tr>
							<th className="px-6 py-3">Title</th>
							<th className="px-6 py-3">Author</th>
						</tr>
					</thead>
					<tbody className="divide-y text-gray-600">
						{blogs.map((blog) => (
							<Blog key={blog.id} blog={blog} user={user} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default BlogsList;
