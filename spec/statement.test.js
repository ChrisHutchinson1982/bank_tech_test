const Statement = require("../lib/statement");

describe("returns printed bank statement", () => {
  xit("when no transaction have been made", () => {
    const statement = new Statement();
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance"
    );
  });
});
