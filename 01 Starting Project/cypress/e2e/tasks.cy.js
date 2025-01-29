/// <reference types='Cypress'/>

describe("task management", () => {
  it("should open and close the new task", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get(".backdrop").click({ force: true });
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
    cy.contains("Add Task").click();
    cy.contains("Cancel").click();
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
  });

  it("should create a new task", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get("#title").type("My new task");
    cy.get("#summary").type("Summary of a new task");

    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 1);
    cy.get(".task h2").contains("My new task");
    cy.get(".task p").contains("Summary of a new task");
  });


  it('shoul validate the user input', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('.modal').contains('Add Task').click();
    cy.contains('Please provide values')

  }
});
