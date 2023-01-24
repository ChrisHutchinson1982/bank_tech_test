const Account = require("../lib/account");
const Statement = require("../lib/statement");
const Transaction = require("../lib/transaction");

describe("adds transactions returns printed bank statement", () => {
  it("when a deposit of 1000 on 10/01/2023", () => {
    const account = new Account();

    const deposit = new Transaction("credit", 1000, "10/01/2023");
    account.add(deposit);

    const statement = new Statement(account);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
  it("when a deposit of 1000 on 10/01/2023 and a deposit of 2000 on 13/01/2023", () => {
    const account = new Account();

    const depositOne = new Transaction("credit", 1000, "10/01/2023");
    account.add(depositOne);
    const depositTwo = new Transaction("credit", 2000, "13/01/2023");
    account.add(depositTwo);

    const statement = new Statement(account);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance\n13/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
  it("when a deposit of 1000 on 10/01/2023, a deposit of 2000 on 13/01/2023 and a withdrawal of 500 on 14/01/2023", () => {
    const account = new Account();

    const depositOne = new Transaction("credit", 1000, "10/01/2023");
    account.add(depositOne);
    const depositTwo = new Transaction("credit", 2000, "13/01/2023");
    account.add(depositTwo);
    const withdrawal = new Transaction("debit", 500, "14/01/2023");
    account.add(withdrawal);

    const statement = new Statement(account);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance\n14/01/2023 || || 500.00 || 2500.00\n13/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
  it("when various deposits and withdrawals with decimal places", () => {
    const account = new Account();

    const depositOne = new Transaction("credit", 1000.01, "10/01/2023");
    account.add(depositOne);
    const depositTwo = new Transaction("credit", 2000.99, "13/01/2023");
    account.add(depositTwo);
    const withdrawalOne = new Transaction("debit", 500.5, "14/01/2023");
    account.add(withdrawalOne);
    const withdrawalTwo = new Transaction("debit", 2500.25, "15/01/2023");
    account.add(withdrawalTwo);

    const statement = new Statement(account);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance\n15/01/2023 || || 2500.25 || 0.25\n14/01/2023 || || 500.50 || 2500.50\n13/01/2023 || 2000.99 || || 3001.00\n10/01/2023 || 1000.01 || || 1000.01"
    );
  });
});

describe("returns error and does not add transaction", () => {
  it("when withdrawal is greater than balance", () => {
    const account = new Account();
    const withdrawal = new Transaction("debit", 500, "14/01/2023");

    try {
      account.add(withdrawal);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        "Unable to complete transaction: insufficient funds"
      );
    }

    const statement = new Statement(account);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance"
    );
  });

  it("when transaction type is not debit or credit", () => {
    const account = new Account();
    const transaction = new Transaction("something", 500, "14/01/2023");

    try {
      account.add(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        "Unable to complete transaction: invalid transaction type"
      );
    }

    const statement = new Statement(account);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance"
    );
  });

  it("when transaction amount is not a number", () => {
    const account = new Account();
    const transaction = new Transaction("credit", "something", "14/01/2023");

    try {
      account.add(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        "Unable to complete transaction: invalid transaction amount"
      );
    }

    const statement = new Statement(account);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance"
    );
  });

  it("when transaction amount is not a negative number", () => {
    const account = new Account();
    const transaction = new Transaction("credit", -500, "14/01/2023");

    try {
      account.add(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        "Unable to complete transaction: invalid transaction amount"
      );
    }

    const statement = new Statement(account);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance"
    );
  });
  it("when transaction date is not a date", () => {
    const account = new Account();
    const transaction = new Transaction("credit", 500, "something");

    try {
      account.add(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        "Unable to complete transaction: invalid transaction date"
      );
    }

    const statement = new Statement(account);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance"
    );
  });
  it("when transaction date is incorrect date format yyyy/mm/dd", () => {
    const account = new Account();
    const transaction = new Transaction("credit", 500, "2023/01/10");

    try {
      account.add(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        "Unable to complete transaction: invalid transaction date"
      );
    }

    const statement = new Statement(account);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance"
    );
  });
  it("when transaction date is incorrect date format mm/dd/yyyy", () => {
    const account = new Account();
    const transaction = new Transaction("credit", 500, "12/13/2022");

    try {
      account.add(transaction);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(
        "Unable to complete transaction: invalid transaction date"
      );
    }

    const statement = new Statement(account);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance"
    );
  });
});

describe("re-orders transactions and returns printed bank statement", () => {
  it("when two transactions not in date order", () => {
    const account = new Account();
    const depositOne = new Transaction("credit", 2000, "13/01/2023");
    account.add(depositOne);
    const depositTwo = new Transaction("credit", 1000, "10/01/2023");
    account.add(depositTwo);

    expect(account.sortTransactionsByDate()).toEqual([
      { amount: 1000, date: "10/01/2023", type: "credit" },
      { amount: 2000, date: "13/01/2023", type: "credit" },
    ]);

    const statement = new Statement(account);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance\n13/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
  it("when various transactions not in date order", () => {
    const account = new Account();
    const depositOne = new Transaction("credit", 2000, "13/01/2023");
    account.add(depositOne);
    const depositTwo = new Transaction("credit", 1000, "10/01/2023");
    account.add(depositTwo);
    const withdrawalOne = new Transaction("debit", 499.5, "12/01/2023");
    account.add(withdrawalOne);
    const withdrawalTwo = new Transaction("debit", 2500.25, "15/01/2023");
    account.add(withdrawalTwo);

    expect(account.sortTransactionsByDate()).toEqual([
      { amount: 1000, date: "10/01/2023", type: "credit" },
      { amount: 499.5, date: "12/01/2023", type: "debit" },
      { amount: 2000, date: "13/01/2023", type: "credit" },
      { amount: 2500.25, date: "15/01/2023", type: "debit" },
    ]);

    const statement = new Statement(account);
    expect(statement.printStatement()).toBe(
      "date || credit || debit || balance\n15/01/2023 || || 2500.25 || 0.25\n13/01/2023 || 2000.00 || || 2500.50\n12/01/2023 || || 499.50 || 500.50\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
});
