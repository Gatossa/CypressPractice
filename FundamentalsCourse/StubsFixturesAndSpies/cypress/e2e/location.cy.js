/// <reference types="cypress" />

describe("share location", () => {
  beforeEach(() => {
    cy.clock();
    cy.fixture("user-location.json").as("userLocation");
    cy.visit("/").then((win) => {
      cy.get("@userLocation").then((fakePosition) => {
        cy.stub(win.navigator.geolocation, "getCurrentPosition")
          .as("getCurrentUserLocalization")
          .callsFake((cb) => {
            setTimeout(() => {
              cb(fakePosition);
            }, 100);
          });
      });

      cy.stub(win.navigator.clipboard, "writeText")
        .as("saveToClipboard")
        .resolves();
      cy.spy(win.localStorage, "setItem").as("saveLocation");
      cy.spy(win.localStorage, "getItem").as("getStoredLocation");
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

    cy.get("@userLocation").then((fakePosition) => {
      const { latitude, longitude } = fakePosition.coords;
      cy.get("@saveToClipboard").should(
        "have.been.calledWithMatch",
        new RegExp(`${latitude}.*${longitude}.*${encodeURI("Anne Dave")}`)
      );
    });
    cy.get("@saveLocation").should("have.been.called");
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get("[data-cy=info-message]").should("be.visible");

    cy.tick(2000);
    cy.get("[data-cy=info-message]").should("not.be.visible");
  });
});
