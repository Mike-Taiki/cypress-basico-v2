// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (project) => {
  cy.contains("Nome").siblings("input").type("Joao");
  cy.contains("Sobrenome").siblings("input").type("de Deus");
  cy.contains("E-mail").siblings("input").type("abc@mail.com.br");
  cy.contains("Como podemos te ajudar?")
    .siblings("textarea")
    .type("Minha TV queimou. Me ajudem a resolver esse problema", { delay: 0 });
  cy.contains("Enviar").click();

  cy.contains("Mensagem enviada com sucesso.").should("be.visible");
});
