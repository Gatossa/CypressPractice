/// <reference types="Cypress" />

describe("Newsletter", () => {
  beforeEach(() => {
    cy.task("seedDatabase");
  });
  it("should display a confirmation newsletter message", () => {
    cy.intercept("POST", "/api/newsletter", { status: 201 }).as("subscribe");
    cy.visit("/");
    cy.get('[data-cy="newsletter-email"]').type("test@example.com");
    cy.get('[data-cy="newsletter-submit"]').click();
    //cy.wait("@subscribe");
    cy.contains("Thanks for signing up!");
  });

  it("should display validation errors", () => {
    cy.intercept("POST", "/api/newsletter", {
      message: "Email exists already.",
    }).as("subscribe");
    cy.visit("/");
    cy.get('[data-cy="newsletter-email"]').type("test@example.com");
    cy.get('[data-cy="newsletter-submit"]').click();
    //cy.wait("@subscribe");
    cy.contains("Email exists already.");
  });

  it("should create a new contact", () => {
    cy.request({
      method: "POST",
      url: "/newsletter",
      body: { email: "test@example.com" },
      form: true,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("email", "test@example.com");
    });
  });
});
