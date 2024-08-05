/// <reference types="cypress" />

describe("First test suite", () => {
  it("first test", () => {
    cy.visit("/"); //因為網址有寫在 cypress.config.js => e2e 底下的 baseUrl 了
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // by tag name 找標籤
    cy.get("input");

    // by ID (要加 # 字號，代表找 ID) 找 ID
    cy.get("#inputEmail3");

    // by Class value (要加 . 點號，代表找 class) 找 class
    cy.get(".input-full-width");

    // by Attribute name 屬性名稱 (要用 [] 中括號，代表找屬性名) 找屬性名稱
    // 跟屬性有關的都要用 [] 中括號
    cy.get("[fullwidth]");

    // by Attribute and value 屬性名與屬性值 (要用 [] 中括號，代表找屬性名……) 找屬性名稱對應的屬性值
    cy.get('[placeholder="Email"]');

    // by entire Class value 找全部的 class 屬性值 (要用 [] 中括號去找 class = xxxxxx xxx xx) 找屬性是class的所有對應的值
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by two attributes 找兩個屬性 (兩個屬性分別用 [] 中括號括起來，中間不能有空白) 找多個屬性及其對應的值
    cy.get('[placeholder="Email"][fullwidth]');

    // by tag, attribute, id and class 一起抓，混合的找標籤、屬性、ID、class 一起找
    cy.get('input[placeholder="Email"]#inputEmail3.input-full-width');

    // by cypress test ID 如果有辦法改原始碼，可以自訂 data-cy 的值
    cy.get('[data-cy="imputEmail1"]');
  });

  it.only("second test", () => {
    cy.visit("/"); //因為網址有寫在 cypress.config.js => e2e 底下的 baseUrl 了
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // Theory 理論
    // get() - find elements on the page by locator globally (get 是找整個頁面的全局的元素)
    // find() - find child elements by locator (find()不能單獨使用)
    // contains() - find HTML text and by text and locator

    cy.contains("Sign in"); // Sign in 是根據 HTML 裡面的 text 文字而來的
    cy.contains('[status="warning"]', "Sign in"); // [status="warning"] 是指屬性所對應的值，Sign in 是根據 HTML 裡面的 text 文字而來的
    cy.contains("nb-card", "Horizontal form").find("button"); //nb-card 是"標籤"，Horizontal form 是 HTML的文字
    cy.contains("nb-card", "Horizontal form").contains("Sign in"); //nb-card 是"標籤"，Horizontal form 是 HTML的文字，Sign in 是 HTML的文字
    cy.contains("nb-card", "Horizontal form").get("button"); // nb-card 是"標籤"，Horizontal form 是 HTML的文字，get() 是找全局的 button

    // cypress chains and DOM
    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();
  });
});
