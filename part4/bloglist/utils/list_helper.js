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

module.exports = {
	dummy,
	totalLikes,
};
