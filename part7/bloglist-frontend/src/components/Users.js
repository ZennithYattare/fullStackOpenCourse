// *DONE 7.14: Users view - Implement a view to the application that displays all of the basic information related to users.

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/users";

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
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
