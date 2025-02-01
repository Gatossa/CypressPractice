/// <reference types="Cypress" />

describe("Newsletter", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });
  it("should display a confirmation newsletter message", () => {
    cy.intercept("POST", "/api/newsletter", { status: 201 });
    cy.visit("/");
    cy.get('[data-cy="newsletter-email"]').type("test@example.com");
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.contains("Thanks for signing up!");
  });
});
