/// <reference types="cypress" />

describe("share location", () => {
  it("should fetch the user location", () => {
    cy.visit("/").then((win) => {
      cy.stub(win.navigator.geolocation, "getCurrentPosition").as(
        "getCurrentUserLocalization"
      );
    });
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get("@getCurrentUserLocalization").should("have.been.called");
  });
});
