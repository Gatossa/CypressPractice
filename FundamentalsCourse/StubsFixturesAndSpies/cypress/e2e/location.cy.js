/// <reference types="cypress" />

describe("share location", () => {
  beforeEach(() => {
    cy.visit("/").then((win) => {
      cy.stub(win.navigator.geolocation, "getCurrentPosition")
        .as("getCurrentUserLocalization")
        .callsFake((cb) => {
          setTimeout(() => {
            cb({
              coords: {
                latitude: 41,
                longitude: 57,
              },
            });
          }, 100);
        });
      cy.stub(win.navigator.clipboard, "writeText")
        .as("saveToClipboard")
        .resolves();
    });
  });

  it("should fetch the user location", () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get("@getCurrentUserLocalization").should("have.been.called");
    cy.get('[data-cy="get-loc-btn"]').should("be.disabled");
    cy.get('[data-cy="actions"]').should("contain", "Location");
  });

  it("should share the user location URL", () => {
    cy.get('[data-cy="name-input"]').type("Anne Dave");
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get("@saveToClipboard").should("have.been.called");
  });
});
