const Account = require("./account");

describe("returns printed bank statement", () => {
  xit("when no transaction have been made", () => {
    const account = new Account();
    expect(account.printStatement()).toBe("date || credit || debit || balance");
  });
  xit("when a deposit of 1000 on 10/01/2023", () => {
    const account = new Account();
    const depositDouble = {
      getValue: () => 1000,
      getStatmentFormat: () => "\n10/01/2023 || 1000.00 || ||",
    };
    account.add(depositDouble);
    expect(account.printStatement()).toBe(
      "date || credit || debit || balance\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
});
