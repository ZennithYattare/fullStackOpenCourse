/** @format */

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const likes = blogs.map((blog) => blog.likes);
	const sum = likes.reduce((acc, curr) => acc + curr, 0);
	return sum;
};

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
	const favorite = blogs.find((blog) => blog.likes === maxLikes);

	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes,
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
