/// <reference types='Cypress'/>

describe("contact form", () => {
  beforeEach(() => {
    cy.visit("/about");
  });
  it("should submit the form", () => {
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

  it("should validate the form input", () => {
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).not.to.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending ..");

      cy.get('[data-cy="contact-input-message"]').as("msgInput");
      cy.get("@msgInput").focus().blur();
      cy.get("@msgInput")
        .parent()
        .should("have.attr", "class")
        .and("match", /invalid/);
      cy.get('[data-cy="contact-input-name"]').focus().blur();
      cy.get('[data-cy="contact-input-name"]')
        .parent()
        .should("have.attr", "class")
        .and("match", /invalid/);

      cy.get('[data-cy="contact-input-email"]').focus().blur();
      cy.get('[data-cy="contact-input-email"]')
        .parent()
        .should((el) => {
          expect(el.attr("class")).contains("invalid");
          expect(el.attr("class")).not.to.be.undefined;
        });
    });
  });
});
