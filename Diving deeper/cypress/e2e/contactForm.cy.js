/// <reference types='Cypress'/>

describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message"]').type(
      "Hello, this is my new test message"
    );
    cy.get('[data-cy="contact-input-name"]').type("Jane Doe");

    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.equal("Send Message");
    });
    cy.get('[data-cy="contact-input-email"]').type("test@example.pl{enter}");

    //   .contains("Send Message")
    //   .should("not.have.attr", "disabled");
    cy.get('[data-cy="contact-btn-submit"]').as("subBtn");
    cy.get("@subBtn").click();
    cy.get("@subBtn").contains("Sending...");
    cy.get("@subBtn").should("have.attr", "disabled");
  });
});
