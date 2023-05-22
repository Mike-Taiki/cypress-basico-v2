/// <reference types="Cypress" />

const typePersonalData = () => {
  cy.get("#firstName").type("Joao");
  cy.get("#lastName").type("de Deus");
  cy.get("#email").type("abc@mail.com.br");
  cy.get("#open-text-area").type(
    "Minha TV queimou. Me ajudem a resolver esse problema",
    { delay: 0 }
  );
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
    cy.clock();
    cy.contains("Enviar").click();

    cy.contains("Mensagem enviada com sucesso.").should("be.visible");
    cy.tick(3000);
    cy.get('.success').should('not.be.visible');
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#email-checkbox").type("asdf").click();
    cy.clock();
    cy.contains("Enviar").click();
    cy.contains("Valide os campos obrigatórios!").should("be.visible");
    cy.tick(3000);
    cy.get('.error').should('not.be.visible');
  });

  it("input de telefone fica vazio quando o valor digitado não é numérico", () => {
    cy.get("#phone").type("Alou").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    typePersonalData();
    cy.clock();
    cy.get("#phone-checkbox").check();
    cy.contains("Enviar").click();

    cy.contains("Valide os campos obrigatórios!").should("be.visible");
    cy.tick(3000);
    cy.get('.error').should('not.be.visible');
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName").type("Joao").should("have.value", "Joao");
    cy.get("#lastName").type("de Deus").should("have.value", "de Deus");
    cy.get("#email")
      .type("abc@mail.com.br")
      .should("have.value", "abc@mail.com.br");
    cy.get("#open-text-area")
      .type("Minha TV queimou", {
        delay: 0,
      })
      .should("have.value", "Minha TV queimou");

    cy.get("#firstName").clear().should("have.value", "");
    cy.get("#lastName").clear().should("have.value", "");
    cy.get("#email").clear().should("have.value", "");
    cy.get("#open-text-area").clear().should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.clock();
    cy.contains("Enviar").click();
    cy.contains("Valide os campos obrigatórios!").should("be.visible");
    cy.tick(3000);
    cy.get('.error').should('not.be.visible');
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback', () => {
    cy.get('[type="radio"]').check("feedback").should("be.checked", "feedback");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('[type="radio"]')
      .should("have.length", 3)
      .each(($radio) => {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .should("have.length", 2)
      .check()
      .each(($checkbox) => cy.wrap($checkbox).should("be.checked"))
      .last()
      .uncheck();

    cy.get('input[type="checkbox"][value="phone"]').should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json")
      .then((input) => expect(input[0].files[0].name).to.equal("example.json"));
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .then((input) => expect(input[0].files[0].name).to.equal("example.json"));
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("json");

    cy.get("#file-upload")
      .selectFile("@json")
      .then((input) => expect(input[0].files[0].name).to.equal("example.json"));
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get('a[href="privacy.html"]').should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get('a[href="privacy.html"]').invoke("removeAttr", "target").click();
    cy.get("#title").contains("Política de privacidade");
  });
});
