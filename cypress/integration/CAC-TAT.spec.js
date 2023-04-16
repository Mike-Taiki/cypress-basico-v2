/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("../../src/index.html");
  });
  it("verifica o titulo da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });
});
