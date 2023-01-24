const Statement = require("../lib/statement");

describe("returns printed bank statement", () => {
  it("when no transaction have been made", () => {
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
});
