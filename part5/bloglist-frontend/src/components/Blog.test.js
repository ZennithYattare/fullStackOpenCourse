/** @format */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog component", () => {
	const blog = {
		title: "Test Blog",
		author: "Test Author",
		url: "http://test.com",
		likes: 10,
		user: {
			username: "testuser",
			name: "Test User",
		},
	};

	test("renders title and author, but not URL or likes by default", () => {
		const { container } = render(<Blog blog={blog} />);

		const div = container.querySelector(".blogsList");
		expect(div).toHaveTextContent(`${blog.title} - ${blog.author}`);
		expect(div).not.toHaveTextContent(blog.url);
		expect(div).not.toHaveTextContent(`likes ${blog.likes}`);
	});
});
