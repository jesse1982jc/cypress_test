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

  it("second test", () => {
    cy.visit("/"); //因為網址有寫在 cypress.config.js => e2e 底下的 baseUrl 了
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // Theory 理論
    // get() - find elements on the page by locator globally (get 是找整個頁面的全局的元素)
    // find() - find child elements by locator (find()不能單獨使用)
    // contains() - find HTML text and by text and locator

    cy.contains("Sign in"); // Sign in 是根據 HTML 裡面的 text 文字而來的，這個地方只會找到第一個 Sign in BTN
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

  it("save subject of the command", () => {
    cy.visit("/");
    cy.contains("Form").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.contains("nb-card", "Using the Grid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    //注意: 以下 不可以這樣做
    // const usingTheGrid = cy.contains("nb-card", "Using the Grid");
    // usingTheGrid.find('[for="inputEmail1"]').should("contain", "Email");
    // usingTheGrid.find('[for="inputPassword2"]').should("contain", "Password");

    // 1. Cypress Alias(別名) 用 as 取別名，後面接 cy.get(@xxxx)
    cy.contains("nb-card", "Using the Grid").as("usingTheGrid");
    cy.get("@usingTheGrid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.get("@usingTheGrid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    // 2. Cypress then() methods，then() 裡面放 callback function
    cy.contains("nb-card", "Using the Grid").then((usingTheGridForm) => {
      cy.wrap(usingTheGridForm)
        .find('[for="inputEmail1"]')
        .should("contain", "Email");
      cy.wrap(usingTheGridForm)
        .find('[for="inputPassword2"]')
        .should("contain", "Password");
    });
  });

  it("test 2", () => {
    cy.visit("/");
    cy.contains("Form").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.contains("nb-card", "Using the Grid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    // 1 別名
    cy.contains("nb-card", "Using the Grid").as("useingTheGrid");
    cy.get("@useingTheGrid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.get("@useingTheGrid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    // 2 使用 then() 方法
    cy.contains("nb-card", "Using the Grid").then((usingTheGridForm2) => {
      cy.wrap(usingTheGridForm2)
        .find('[for="inputEmail1"]')
        .should("contain", "Email");
      cy.wrap(usingTheGridForm2)
        .find('[for="inputPassword2"]')
        .should("contain", "Password");
    });
  });

  it("extract text values", () => {
    cy.visit("/");
    cy.contains("Form").click();
    cy.contains("Form Layouts").click();

    // 1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    // 2
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      const labelText = label.text();
      expect(labelText).to.equal("Email address");
      cy.wrap(label).should("contain", "Email address");
    });

    // 3
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .as("labelText")
      .should("contain", "Email address");

    // 4
    cy.get('[for="exampleInputEmail1"]')
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.be.equal("label");
      });

    // 5 invoke property
    cy.get("#exampleInputEmail1").type("test@test.com"); // 也可以寫成 cy.get('[id="exampleInputEmail1"]').type("test@test.com")
    cy.get("#exampleInputEmail1") // 也可以寫成 cy.get('[id="exampleInputEmail1"]')
      .invoke("prop", "value")
      .should("contain", "test@test.com")
      .then((property) => {
        expect(property).to.equal("test@test.com");
      });
  });

  it("radio buttons", () => {
    cy.visit("/");
    cy.contains("Form").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        // 這是是指所有的 radioButtons，共3個
        cy.wrap(radioButtons).eq(0).check({ force: true }).should("be.checked"); // 第 1 個 radioButton 被點擊，其他的不會被點擊
        cy.wrap(radioButtons).eq(1).check({ force: true }).should("be.checked"); // 換到第 2 個 radioButton 被點擊，第 1 個 radioButton 就不會被點擊了
        cy.wrap(radioButtons).eq(0).should("not.be.checked"); // 確認第 1 個 radioButton 沒有被點擊
        cy.wrap(radioButtons).eq(2).should("be.disabled"); // 確認第 3 個是反灰禁用狀態
      });
  });

  it("checkboxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    // 因為 checkbox 元素在此頁面只有一個地方，所以用 cy.get()...
    // cy.get('[type="checkbox"]').check({ force: true }); // 使用 check() 是指把核取方塊打勾起來，原本有打勾的就不動，沒打勾的才打勾
    cy.get('[type="checkbox"]').uncheck({ force: true }); // 使用 uncheck() 是指把核取方塊打勾取消，原本就沒打勾的就不動，有打勾的才取消
    // cy.get('[type="checkbox"]').eq(1).uncheck({ force: true });
    cy.get('[type="checkbox"]').eq(0).click({ force: true }); // 使用 click() 是點擊一下，不管先前的狀態是否 check 或 uncheck
    cy.get('[type="checkbox"]').eq(1).check({ force: true });
  });

  it("datepicker", () => {
    // 新建一個函式跑遞迴
    function selectDayFromCurrent(day) {
      let date = new Date(); // 創建新的 Date 物件
      date.setDate(date.getDate() + day); //先取得當前的日期 day 的部分，再加 5 天，再去設定日期為 day + 5 的 day
      // console.log(date);

      let futureDay = date.getDate(); // 把 day + 5 丟給新變數 futureDay
      let futureMonth = date.toLocaleDateString("en-US", { month: "short" });
      let futureYear = date.getFullYear();

      let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (
            !dateAttribute.includes(futureMonth) ||
            !dateAttribute.includes(futureYear)
          ) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get(".day-cell")
              .not(".bounding-month")
              .contains(futureDay)
              .click();
          }
        });
      return dateToAssert;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        const dateToAssert = selectDayFromCurrent(400);
        cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
        cy.wrap(input).should("have.value", dateToAssert);
      });
  });

  it("datepicker2", () => {
    function selectDayFromCurrendDay(day) {
      // 建立一個 date 物件
      let date = new Date();
      date.setDate(date.getDate() + day); // 1. 先拿到今天的日期，再 + 5 天。  2. 再去設定成今天日期
      let futureDay2 = date.getDate(); // 取得今天的日期，再丟給變數 futureDate2
      let futureMonth2 = date.toLocaleDateString("en-US", { month: "short" });
      let futureYear2 = date.getFullYear();
      let dateToAssert2 = `${futureMonth2} ${futureDay2}, ${futureYear2}`; // 設定之後要斷言的字串格式

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateToAttribute) => {
          if (
            !dateToAttribute.includes(futureMonth2) ||
            !dateToAttribute.includes(futureYear2)
          ) {
            // 假如 dateToAttribute 不在範圍的年、月份裡面，就要繼續點 ">" 切換到下一個月
            // 條件成立
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrendDay(day);
          } else {
            // 找到 dateToAttribute 找到在範圍內了，直接點該日期
            // 條件不成立
            cy.get(".day-cell")
              .not(".bounding-month")
              .contains(futureDay2)
              .click();
          }
        });
      return dateToAssert2;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();

        const dateToAssertUse = selectDayFromCurrendDay(600);
        // cy.get(".day-cell").not(".bounding-month").contains(futureDay2).click();
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", dateToAssertUse);
        cy.wrap(input).should("have.value", dateToAssertUse);
      });
  });

  it("datepicker test", () => {
    function selectDayFromCurrendDay2(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);

      let futureDay = date.getDate();
      let futureMonth = date.toLocaleDateString("en-US", { month: "short" });
      let futureYear = date.getFullYear();

      let dateAssert = `${futureMonth} ${futureDay}, ${futureYear}`;

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateForAttribute) => {
          if (
            !dateForAttribute.includes(futureMonth) ||
            !dateForAttribute.includes(futureYear)
          ) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrendDay2(day);
          } else {
            cy.get(".day-cell")
              .not(".bounding-month")
              .contains(futureDay)
              .click();
          }
        });
      return dateAssert;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((inputValue) => {
        cy.wrap(inputValue).click();

        // 執行重要的函式
        const dateForAssert = selectDayFromCurrendDay2(200);

        cy.wrap(inputValue)
          .invoke("prop", "value")
          .should("contain", dateForAssert);

        cy.wrap(inputValue).should("have.value", dateForAssert);
      });
  });

  it("Lists and dropdowns", () => {
    cy.visit("/");

    // cy.get("nav").find("nb-select").click();
    // 也可以寫成下列這樣 get("兩個標籤中空一格之類的……")
    // 1.
    cy.get("nav nb-select").click();
    cy.get(".options-list").contains("Dark").click();
    cy.get("nav nb-select").should("contain", "Dark");
    // cy.get("nav nb-select")
    //   .invoke("attr", "ng-reflect-selected")
    //   .should("contain", "dark");

    // 2.
    cy.get("nav nb-select").then((dropDown) => {
      cy.wrap(dropDown).click();

      cy.get(".options-list nb-option").each((listItem, index) => {
        // 找到四個下拉選單的選項 item
        const itemText = listItem.text().trim(); // 抓取每個 item 的文字出來，去頭尾空白
        cy.wrap(listItem).click();
        cy.wrap(dropDown).should("contain", itemText);

        if (index < 3) {
          // index 從 0，1，2 跑，當跑到 3 時，因為條件不符合，就跳出了 (因為到第四個 listItem[3] 時，已經是最後一次遍歷，所以不需要再 click 一次了)
          cy.wrap(dropDown).click(); //讓下拉選單的選項，再次被點擊打開 (因為每次 click 一次，下拉選單會折疊關閉起來)
        }
      });
    });
  });

  it.only("Web tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // 1. Get the row by text
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("35");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "35");
      });

    // 2. Get row by index
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((inputTableRow) => {
        cy.wrap(inputTableRow).find('[placeholder="First Name"]').type("Jesse");
        cy.wrap(inputTableRow).find('[placeholder="Last Name"]').type("Huang");
        cy.wrap(inputTableRow).find(".nb-checkmark").click();
      });

    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableColumns) => {
        cy.wrap(tableColumns).eq(2).should("contain", "Jesse");
        cy.wrap(tableColumns).eq(3).should("contain", "Huang");
      });
    // 也可以這樣寫
    cy.get("tbody tr").eq(0).find("td").eq(2).should("contain", "Jesse");
    cy.get("tbody tr").eq(0).find("td").eq(3).should("contain", "Huang");
  });
});
