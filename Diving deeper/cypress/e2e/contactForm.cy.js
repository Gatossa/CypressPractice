/// <reference types='Cypress'/>

describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message"]').type(
      "Hello, this is my new test message"
    );
    cy.get('[data-cy="contact-input-name"]').type("Jane Doe");
    cy.get('[data-cy="contact-input-email"]').type("test@example.pl");
    cy.get('[data-cy="contact-btn-submit"]')
      .contains("Send Message")
      .should("not.have.attr", "disabled");
    cy.get('[data-cy="contact-btn-submit"]')
      .click()
      .contains("Sending...")
      .should("have.attr", "disabled");
  });
});
