const Account = require("./account");
const Transaction = require("./transaction");

describe("returns printed bank statement", () => {
  it("when a deposit of 1000 on 10/01/2023", () => {
    const account = new Account();
    const deposit = new Transaction("credit", 1000, "10/01/2023");
    account.add(deposit);
    expect(account.printStatement()).toBe(
      "date || credit || debit || balance\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
  it("when a deposit of 1000 on 10/01/2023 and a deposit of 2000 on 13/01/2023", () => {
    const account = new Account();
    const depositOne = new Transaction("credit", 1000, "10/01/2023");
    account.add(depositOne);
    const depositTwo = new Transaction("credit", 2000, "13/01/2023");
    account.add(depositTwo);
    expect(account.printStatement()).toBe(
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
    expect(account.printStatement()).toBe(
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

    expect(account.printStatement()).toBe(
      "date || credit || debit || balance\n15/01/2023 || || 2500.25 || 0.25\n14/01/2023 || || 500.50 || 2500.50\n13/01/2023 || 2000.99 || || 3001.00\n10/01/2023 || 1000.01 || || 1000.01"
    );
  });
});

describe("returns error", () => {
  it("when no deposits but a withdrawal of 500 on 14/01/2023", () => {
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
  });
});
// edge cases 0dp amount and differemt date formats
