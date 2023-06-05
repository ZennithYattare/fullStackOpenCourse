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
