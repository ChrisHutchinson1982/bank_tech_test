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
  it("when a deposit of 1000 on 10/01/2023 and a withdrawal of 500.50 on 14/01/2023", () => {
    const account = new Account();

    const depositDouble = {
      getValue: () => 1000,
      getStatmentFormat: () => "\n10/01/2023 || 1000.00 || ||",
      validType: () => true,
      validAmount: () => true,
      validDate: () => true,
      date: "10/01/2023",
    };
    account.add(depositDouble);

    const withdrawalDouble = {
      getValue: () => -500.5,
      getStatmentFormat: () => "\n14/01/2023 || || 500.50 ||",
      validType: () => true,
      validAmount: () => true,
      validDate: () => true,
      date: "14/01/2023",
    };
    account.add(withdrawalDouble);

    expect(account.printStatement()).toBe(
      "date || credit || debit || balance\n14/01/2023 || || 500.50 || 499.50\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
  xit("when two transactions not in date order", () => {
    const account = new Account();

    const depositOneDouble = {
      getValue: () => 2000,
      getStatmentFormat: () => "\n13/01/2023 || 2000.00 || ||",
      validType: () => true,
      validAmount: () => true,
      validDate: () => true,
      date: "13/01/2023",
    };
    account.add(depositOneDouble);

    const depositTwoDouble = {
      getValue: () => 1000,
      getStatmentFormat: () => "\n10/01/2023 || 1000.00 || ||",
      validType: () => true,
      validAmount: () => true,
      validDate: () => true,
      date: "10/01/2023",
    };
    account.add(depositTwoDouble);

    expect(account.sortTransactionsByDate()).toEqual([
      { amount: 1000, date: "10/01/2023", type: "credit" },
      { amount: 2000, date: "13/01/2023", type: "credit" },
    ]);
    expect(account.printStatement()).toBe(
      "date || credit || debit || balance\n13/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
});
