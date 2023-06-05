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
		cy.wait(500);
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
