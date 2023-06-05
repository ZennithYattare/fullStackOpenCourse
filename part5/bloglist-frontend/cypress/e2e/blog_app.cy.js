/** @format */

describe("Blog app", () => {
	it("Initial login page can be opened", () => {
		cy.visit("http://localhost:3000");
		cy.contains("Login to application");
	});
});
