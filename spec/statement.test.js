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
});
