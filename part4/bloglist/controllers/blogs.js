/** @format */

const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { blogs: 0 });
	response.json(blogs);
});

// Added the following middleware to the route handler for the HTTP POST request to the /api/blogs endpoint as using it in the app.js as app.use(middleware.tokenExtractor) and/or app.use(middleware.verifyToken) applied to the GET route which does not need authentication to see all the blogs.
blogsRouter.post(
	"/",
	middleware.tokenExtractor,
	middleware.verifyToken,
	async (request, response) => {
		const body = request.body;
		const decodedToken = jwt.verify(request.token, process.env.SECRET);

		if (!decodedToken.id) {
			return response.status(401).json({ error: "token invalid" });
		}
		const user = await User.findById(decodedToken.id);

		if (!body.title || !body.url) {
			return response.status(400).json({ error: "title or url missing" });
		}

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes || 0,
			user: user._id,
		});

		const savedBlog = await blog.save();
		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();

		response.status(201).json(savedBlog.toJSON());
	}
);

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body;

	const blog = {
		likes: body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	});

	response.json(updatedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

// export
module.exports = blogsRouter;
