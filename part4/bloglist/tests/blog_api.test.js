/** @format */

const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");
const Blog = require("../models/blog");

// const logger = require("../utils/logger");

beforeEach(async () => {
	await Blog.deleteMany({});

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog);
		await blogObject.save();
	}
});

describe("when there is initially some notes saved", () => {
	test("blogs are returned as JSON", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("returns the correct amount of blog posts", async () => {
		const response = await api.get("/api/blogs");
		expect(response.body).toHaveLength(helper.initialBlogs.length);
	});

	test("unique identifier property is named id", async () => {
		const response = await api.get("/api/blogs");
		expect(response.body[0].id).toBeDefined();
	});
});

describe("addition of a new blog", () => {
	test("a valid blog can be added", async () => {
		const newBlog = {
			title: "New blog post",
			author: "John Doe",
			url: "https://example.com/new-blog-post",
			likes: 0,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

		const titles = blogsAtEnd.map((blog) => blog.title);
		expect(titles).toContain("New blog post");
	});

	test("if likes property is missing, it defaults to 0", async () => {
		const newBlog = {
			title: "New blog post",
			author: "John Doe",
			url: "https://example.com/new-blog-post",
		};

		const response = await api.post("/api/blogs").send(newBlog).expect(201);

		expect(response.body.likes).toBe(0);
	});

	test("a blog without title is not added", async () => {
		const newBlog = {
			author: "John Doe",
			url: "https://example.com/new-blog-post",
			likes: 0,
		};

		await api.post("/api/blogs").send(newBlog).expect(400);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	});

	test("a blog without url is not added", async () => {
		const newBlog = {
			title: "New blog post",
			author: "John Doe",
			likes: 0,
		};

		await api.post("/api/blogs").send(newBlog).expect(400);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	});
});

describe("upating of a blog", () => {
	test("a blog post can be updated", async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToUpdate = blogsAtStart[0];

		const updatedBlog = {
			...blogToUpdate,
			likes: blogToUpdate.likes + 1,
		};

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(200);

		const blogsAtEnd = await helper.blogsInDb();
		const updatedBlogInDb = blogsAtEnd.find(
			(blog) => blog.id === blogToUpdate.id
		);

		expect(updatedBlogInDb.likes).toBe(blogToUpdate.likes + 1);
	});
});

describe("deletion of a blog", () => {
	test("a blog post can be deleted", async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

		const titles = blogsAtEnd.map((r) => r.title);

		expect(titles).not.toContain(blogToDelete.title);
	});
});

describe("when there is initially one user in db", () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash("sekret", 10);
		const user = new User({ username: "root", passwordHash });

		await user.save();
	});

	test("creation succeeds with a fresh username", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "johndoe",
			name: "John Doe",
			password: "password123",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((user) => user.username);
		expect(usernames).toContain(newUser.username);
	});

	test("creation fails with proper statuscode and message if username already taken", async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: "janedoe",
			name: "Jane Doe",
			password: "password123",
		};

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(result.body.error).toContain("expected `username` to be unique");

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toEqual(usersAtStart);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
