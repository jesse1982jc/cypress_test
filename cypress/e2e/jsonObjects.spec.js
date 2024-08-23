/// <reference types="cypress" />

describe("JSON objects", () => {
  it("JSON objects", () => {
    cy.openHomePage();

    const simpleObject = { key: "value", key2: "value2" };

    const simpleArrayOfValues = ["one", "two", "three"]; //陣列索引從 0 開始

    const arrayOfObjects = [
      { key: "value" },
      { key2: "value2" },
      { key3: "value3" },
    ];

    const typesOfData = { string: "this is a string", number: 10 };

    const mix = {
      FirstName: "Jesse",
      LastName: "Huang",
      Age: 42,
      Students: [
        { firstName: "Sara", lastName: "Conor" },
        { firstName: "Bruce", lastName: "Willis" },
      ],
    };

    console.log(simpleObject.key2);
    console.log(simpleObject["key2"]);
    console.log(simpleArrayOfValues[1]);
    console.log(arrayOfObjects[0].key); //從 arrayOfObjects 的索引 2 的位置，取 key 為 key3 的 值
    console.log(mix.Students[1].lastName);

    const firstNameOfSecondStudent = mix.Students[1].firstName;
  });
});
