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
		<div className="mx-auto max-w-screen-xl px-4 md:px-8">
			<div className="max-w-lg">
				<h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
					{user.name}
				</h3>
			</div>
			<div
				data-testid="blogsList"
				className="blog mt-12 overflow-x-auto rounded-lg border shadow-sm"
			>
				<table className="w-full table-auto text-left text-sm">
					<thead className="border-b bg-gray-50 font-medium text-gray-600">
						<tr>
							<th className="px-6 py-3">Added Blogs</th>
						</tr>
					</thead>
					<tbody className="divide-y text-gray-600">
						{user.blogs.map((blog) => (
							<tr key={blog.id}>
								<td className="whitespace-nowrap px-6 py-4">
									{blog.title}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserBlogs;
