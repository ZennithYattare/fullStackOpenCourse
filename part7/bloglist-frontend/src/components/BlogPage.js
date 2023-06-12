import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getBlog } from "../services/blogs";
import { useDispatchNotification } from "../contexts/NotificationContext";
import { update, removeBlog } from "../services/blogs";
import { useUser } from "../contexts/UserContext";
import Comments from "./Comments";

const BlogPage = () => {
	const id = useParams().id;

	const queryClient = useQueryClient();
	const dispatchNotification = useDispatchNotification();
	const { user } = useUser();
	const navigate = useNavigate();

	const {
		data: blog,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["blog", id],
		queryFn: () => getBlog(id),
		retry: 5,
		retryDelay: 1000,
	});

	const updateBlogMutation = useMutation({
		mutationFn: update,
		onSuccess: (data) => {
			queryClient.setQueryData(["blog", data.id], data);
			// I was thinking of commenting out this line of code as it was doing a GET request after updating the number of likes, but it would be better to keep this line of code as it will update the number of likes in the cache.
			queryClient.invalidateQueries("blog");
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: `Blog "${data.title}" updated successfully!`,
				alert: "success",
			});
		},
		onError: (error) => {
			console.error(error);
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: "Error updating blog",
				alert: "error",
			});
		},
	});

	const handleLike = async (blog) => {
		updateBlogMutation.mutate({
			...blog,
			likes: blog.likes + 1,
		});
	};

	const deleteBlogMutation = useMutation({
		mutationFn: removeBlog,
		onSuccess: (data) => {
			queryClient.removeQueries(["blogs", data.id]);
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: "Blog deleted successfully!",
				alert: "success",
			});
			navigate("/");
		},
		onError: (error) => {
			console.error(error);
			dispatchNotification({
				type: "SHOW_NOTIFICATION",
				message: "Error deleting blog",
				alert: "error",
			});
		},
	});

	const handleBlogDelete = async (blog) => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)) {
			deleteBlogMutation.mutate(blog);
		}
	};

	const deleteBlogButton = () => {
		if (user && user.username === blog.user.username) {
			return (
				<button
					id="blogDeleteButton"
					onClick={() => handleBlogDelete(blog)}
				>
					Delete
				</button>
			);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return (
			<p>
				Blog was not loaded due to problems with the server.{" "}
				<p>Error: {error.message}</p>
			</p>
		);
	}

	const commentContents = blog.comments.map((comment) => comment);
	console.log(commentContents); // ["This is a comment", "Another comment"]

	return (
		<div>
			<h2>{blog.title}</h2>
			<a href={blog.url}>{blog.url}</a>
			<p>Likes: {blog.likes}</p>
			<button data-testid="likeButton" onClick={() => handleLike(blog)}>
				Like
			</button>
			<p>Added by: {blog.user.name}</p>
			{deleteBlogButton()}
			<Comments comments={commentContents} />
		</div>
	);
};

export default BlogPage;
