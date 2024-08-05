/// <reference types="cypress" />

describe("First test suite", () => {
  it("first test", () => {
    cy.visit("/"); //因為網址有寫在 cypress.config.js => e2e 底下的 baseUrl 了
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // by tag name
    cy.get("input");

    // by ID (要加 # 字號，代表找 ID)
    cy.get("#inputEmail3");

    // by Class value (要加 . 點號，代表找 class)
    cy.get(".input-full-width");

    // by Attribute name 屬性名稱 (要用 [] 中括號，代表找屬性名)
    cy.get("[fullwidth]");

    // by Attribute and value 屬性名與屬性值 (要用 [] 中括號，代表找屬性名……)
    cy.get('[placeholder="Email"]');

    // by entire Class value 找全部的 class 屬性值 (要用 [] 中括號去找 class = xxxxxx xxx xx)
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by two attributes 找兩個屬性 (兩個屬性分別用 [] 中括號括起來，中間不能有空白)
    cy.get('[placeholder="Email"][fullwidth]');

    // by tag, attribute, id and class 一起抓
    cy.get('input[placeholder="Email"]#inputEmail3.input-full-width');

    // by cypress test ID
    cy.get('[data-cy="imputEmail1"]');
  });
});
