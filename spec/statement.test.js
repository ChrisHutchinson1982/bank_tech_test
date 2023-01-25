const Statement = require("../lib/statement");

describe("returns printed bank statement", () => {
  it("when no transactions have been made", () => {
    accountDouble = {
      sortByDate: () => [],
    };

    const statement = new Statement(accountDouble);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance"
    );
  });

  it("when a deposit of 1000 on 10/01/2023", () => {
    accountDouble = {
      sortByDate: () => [
        {
          getStatmentFormat: () => "\n10/01/2023 || 1000.00 || ||",
          getValue: () => 1000,
          amount: 1000,
          date: "10/01/2023",
          type: "credit",
        },
      ],
    };

    const statement = new Statement(accountDouble);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });

  it("when a deposit of 1000 on 10/01/2023 and a withdrawal of 500.50 on 14/01/2023", () => {
    accountDouble = {
      sortByDate: () => [
        {
          getStatmentFormat: () => "\n10/01/2023 || 1000.00 || ||",
          getValue: () => 1000,
          amount: 1000,
          date: "10/01/2023",
          type: "credit",
        },
        {
          getStatmentFormat: () => "\n14/01/2023 || || 500.50 ||",
          getValue: () => -500.5,
          amount: 500.5,
          date: "14/01/2023",
          type: "debit",
        },
      ],
    };

    const statement = new Statement(accountDouble);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance\n14/01/2023 || || 500.50 || 499.50\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
});
