// *DONE 7.14: Users view - Implement a view to the application that displays all of the basic information related to users.

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/users";
import { Link } from "react-router-dom";

const Users = () => {
	const {
		data: users,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["users"],
		queryFn: getAllUsers,
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

	return (
		<div className="mx-auto max-w-screen-xl px-4 md:px-8">
			<div className="max-w-lg">
				<h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
					Users
				</h3>
			</div>
			<div
				data-testid="blogsList"
				className="blog mt-12 overflow-x-auto rounded-lg border shadow-sm"
			>
				<table className="w-full table-auto text-left text-sm">
					<thead className="border-b bg-gray-50 font-medium text-gray-600">
						<tr>
							<th className="px-6 py-3">Author</th>
							<th className="px-6 py-3">Blogs Created</th>
						</tr>
					</thead>
					<tbody className="divide-y text-gray-600">
						{users.map((user) => (
							<tr key={user.id}>
								<td className="whitespace-nowrap px-6 py-4">
									<Link to={`/users/${user.id}`}>
										{user.name}
									</Link>
								</td>
								<td>{user.blogs.length}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
