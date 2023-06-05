/** @format */

describe("Blog app", () => {
	beforeEach(function () {
		cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
		cy.visit("");
	});

	it("displays the login form by default", () => {
		cy.contains("Login to application");
		cy.get("form").should("contain", "Username");
		cy.get("form").should("contain", "Password");
		cy.get("form").should("contain", "Login");
	});

	describe("Login", () => {
		beforeEach(function () {
			cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
			const user = {
				name: "Test User",
				username: "testuser",
				password: "testpassword",
			};
			cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
			cy.visit("");
		});

		it("succeeds with correct credentials", () => {
			cy.get("#username").type("testuser");
			cy.get("#password").type("testpassword");
			cy.get("#loginButton").click();
			cy.contains("Logged in successfully!");
		});

		it("fails with wrong credentials", () => {
			cy.get("#username").type("testuser");
			cy.get("#password").type("wrongpassword");
			cy.get("#loginButton").click();
			cy.get(".error")
				.should("contain", "Wrong credentials")
				.and("have.css", "color", "rgb(255, 0, 0)");
			cy.get("html").should("not.contain", "Test User logged in");
		});
	});

	describe("When logged in", () => {
		beforeEach(function () {
			cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
			const user = {
				name: "Test User",
				username: "testuser",
				password: "testpassword",
			};
			cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
			cy.visit("");
			cy.get("#username").type("testuser");
			cy.get("#password").type("testpassword");
			cy.get("#loginButton").click();
			cy.contains("Logged in successfully!");
		});

		it("a new blog can be created", () => {
			cy.contains("Create new blog").click();
			cy.get("#blogFormTitle").type("Test Blog Title");
			cy.get("#blogFormAuthor").type("Test Blog Author");
			cy.get("#blogFormUrl").type("http://testblog.com");
			cy.get("#blogFormSubmitButton").click();
			cy.contains("Test Blog Title");
			cy.contains("Test Blog Author");
		});

		it("a blog can be liked", () => {
			cy.contains("Create new blog").click();
			cy.get("#blogFormTitle").type("Test Blog Title");
			cy.get("#blogFormAuthor").type("Test Blog Author");
			cy.get("#blogFormUrl").type("http://testblog.com");
			cy.get("#blogFormSubmitButton").click();
			cy.contains("Test Blog Title");
			cy.contains("Test Blog Author");
			cy.contains("View").click();
			cy.contains("Likes: 0");
			cy.contains("Like").click();
			cy.contains("Likes: 1");
		});

		it("the user who created a blog can delete it", () => {
			cy.contains("Create new blog").click();
			cy.get("#blogFormTitle").type("Test Blog Title");
			cy.get("#blogFormAuthor").type("Test Blog Author");
			cy.get("#blogFormUrl").type("http://testblog.com");
			cy.get("#blogFormSubmitButton").click();
			cy.contains("Test Blog Title");
			cy.contains("Test Blog Author");
			cy.contains("View").click();
			cy.get("#blogDeleteButton").click();
			cy.get("html").should("not.contain", "Test Blog Title");
			cy.get("html").should("not.contain", "Test Blog Author");
		});
	});
});
