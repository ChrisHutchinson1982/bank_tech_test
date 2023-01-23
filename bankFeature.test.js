const Account = require("./account");

describe("returns printed bank statement", () => {
  it("when no transaction haves been made", () => {
    const account = new Account();
    expect(account.printStatement()).toBe("date || credit || debit || balance");
  });
  xit("when a deposit of 1000 on 10-01-2023", () => {
    const account = new Account();
    const deposit = new Transaction("credit", 1000, "10-01-2023");
    account.add(deposit);
    expect(account.printStatement()).toBe(
      "date || credit || debit || balance\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
  xit("when a deposit of 1000 on 10-01-2023 and a deposit of 2000 on 13-01-2023", () => {
    const account = new Account();
    const depositOne = new Transaction("credit", 1000, "10-01-2023");
    account.add(depositOne);
    const depositTwo = new Transaction("credit", 2000, "13-01-2023");
    account.add(depositTwo);
    expect(account.printStatement()).toBe(
      "date || credit || debit || balance\n13/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
  xit("when a deposit of 1000 on 10-01-2023, a deposit of 2000 on 13-01-2023 and a withdrawal of 500 on 14-01-2023", () => {
    const account = new Account();
    const depositOne = new Transaction("credit", 1000, "10-01-2023");
    account.add(depositOne);
    const depositTwo = new Transaction("credit", 2000, "13-01-2023");
    account.add(depositTwo);
    const withdrawal = new Transaction("debit", 500, "14-01-2023");
    account.add(withdrawal);
    expect(account.printStatement()).toBe(
      "date || credit || debit || balance\n14/01/2023 || || 500.00 || 2500.00\n13/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
});
