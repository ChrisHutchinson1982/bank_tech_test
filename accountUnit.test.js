const Account = require("./account");

describe("creates an account object", () => {
  it("with an empty array for allTransactions", () => {
    const account = new Account();
    expect(account.allTransactions).toEqual([]);
  });
  it("with a 0 value for totalBalance", () => {
    const account = new Account();
    expect(account.totalBalance).toBe(0);
  });
});

describe("adds transactions returns printed bank statement", () => {
  it("when no transaction have been made", () => {
    const account = new Account();
    expect(account.printStatement()).toBe("date || credit || debit || balance");
  });
  it("when a deposit of 1000 on 10/01/2023", () => {
    const account = new Account();
    const depositDouble = {
      getValue: () => 1000,
      getStatmentFormat: () => "\n10/01/2023 || 1000.00 || ||",
      validType: () => true,
      validAmount: () => true,
      validDate: () => true,
    };
    account.add(depositDouble);
    expect(account.printStatement()).toBe(
      "date || credit || debit || balance\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
});
