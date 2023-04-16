/// <reference types="Cypress" />

const typePersonalData = () => {
  cy.contains("Nome").siblings("input").type("Joao");
  cy.contains("Sobrenome").siblings("input").type("de Deus");
  cy.contains("E-mail").siblings("input").type("abc@mail.com.br");
  cy.contains("Como podemos te ajudar?")
    .siblings("textarea")
    .type("Minha TV queimou. Me ajudem a resolver esse problema", { delay: 0 });
};

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("verifica o titulo da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    typePersonalData();
    cy.contains("Enviar").click();

    cy.contains("Mensagem enviada com sucesso.").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.contains("E-mail").siblings("input").type("asdf").click();
    cy.contains("Enviar").click();
    cy.contains("Valide os campos obrigatórios!").should("be.visible");
  });

  it("input de telefone fica vazio quando o valor digitado não é numérico", () => {
    cy.contains("Telefone")
      .siblings("input")
      .type("Alou")
      .should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    typePersonalData();
    cy.contains("Qual seu meio de contato preferencial?")
      .siblings('input[id="phone-checkbox"]')
      .click();
    cy.contains("Enviar").click();

    cy.contains("Valide os campos obrigatórios!").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.contains("Nome")
      .siblings("input")
      .type("Joao")
      .should("have.value", "Joao");
    cy.contains("Sobrenome")
      .siblings("input")
      .type("de Deus")
      .should("have.value", "de Deus");
    cy.contains("E-mail")
      .siblings("input")
      .type("abc@mail.com.br")
      .should("have.value", "abc@mail.com.br");
    cy.contains("Como podemos te ajudar?")
      .siblings("textarea")
      .type("Minha TV queimou", {
        delay: 0,
      })
      .should("have.value", "Minha TV queimou");

    cy.contains("Nome").siblings("input").clear().should("have.value", "");
    cy.contains("Sobrenome").siblings("input").clear().should("have.value", "");
    cy.contains("E-mail").siblings("input").clear().should("have.value", "");
    cy.contains("Como podemos te ajudar?")
      .siblings("textarea")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("Enviar").click();
    cy.contains("Valide os campos obrigatórios!").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
  });
});
