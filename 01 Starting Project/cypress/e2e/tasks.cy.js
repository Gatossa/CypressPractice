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

  it("should validate the user input", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get(".modal").contains("Add Task").click();
    cy.contains("Please provide values");
  });

  it("should filter tasks below the summary", () => {
    cy.visit("http://localhost:5173/");

    cy.contains("Add Task").click();
    cy.get("#title").type("My second task");
    cy.get("#summary").type("Summary of a second task");
    cy.get("#category").select("moderate");
    cy.get(".modal").contains("Add Task").click();
    cy.get("#filter").select("urgent");
    cy.get(".task").should("have.length", 0);
    cy.get("#filter").select("moderate");
    cy.get(".task").should("have.length", 1);
    cy.get("#filter").select("all");
    cy.get(".task").should("have.length", 1);
  });

  it("should add multiple tasks", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get("#title").type("My task 1");
    cy.get("#summary").type("Summary of task 1");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 1);

    cy.contains("Add Task").click();
    cy.get("#title").type("My task 2");
    cy.get("#summary").type("Summary of task 2");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 2);
    cy.get(".task").eq(0).contains("My task 1");
    cy.get(".task").eq(1).contains("My task 2");
  });
});
