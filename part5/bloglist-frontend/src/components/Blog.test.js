/** @format */

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
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

	test("renders title and author by default, but shows URL and likes when 'view' button is clicked", async () => {
		const { container } = render(<Blog blog={blog} />);

		const button = screen.getByTestId("viewButton");
		fireEvent.click(button);

		const div = container.querySelector(".blogsList");
		expect(div).toHaveTextContent(`${blog.title} - ${blog.author}`);
		expect(div).toHaveTextContent(blog.url);
		expect(div).toHaveTextContent(`likes ${blog.likes}`);
	});
});
