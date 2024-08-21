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
        cy.get(".day-cell").not(".bounding-month").contains(futureDay).click();
      }
    });
  return dateToAssert;
}

export class DatePickerPage {
  selectCommonDatepickerDateFormToday(dayFromToday) {
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        let dateAssert = selectDayFromCurrent(dayFromToday);
        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
        cy.wrap(input).should("have.value", dateAssert);
      });
  }

  selectDatepickerWithRangeFromToday(firstDay, secondDay) {
    cy.contains("nb-card", "Datepicker With Range")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        let dateAssertFirst = selectDayFromCurrent(firstDay);
        let dateAssertSecond = selectDayFromCurrent(secondDay);
        const finalDate = dateAssertFirst + " - " + dateAssertSecond;
        cy.wrap(input).invoke("prop", "value").should("contain", finalDate);
        cy.wrap(input).should("have.value", finalDate);
      });
  }
}

export const onDatePickerPage = new DatePickerPage();
