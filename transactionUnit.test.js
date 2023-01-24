const Transaction = require("./transaction");

describe("creates a transaction oject", () => {
  it("when a deposit of 1000 on 10-01-2023", () => {
    const deposit = new Transaction("credit", 1000, "10/01/2023");
    expect(deposit.type).toBe("credit");
    expect(deposit.amount).toBe(1000);
    expect(deposit.date).toBe("10/01/2023");
  });
  it("when a withdrawal of 500 on 14/01/2023", () => {
    const withdrawal = new Transaction("debit", 500, "14/01/2023");
    expect(withdrawal.type).toBe("debit");
    expect(withdrawal.amount).toBe(500);
    expect(withdrawal.date).toBe("14/01/2023");
  });
});

describe("getStatmentFormat - returns correct format for statement", () => {
  it("when a deposit of 1000 on 10-01-2023", () => {
    const deposit = new Transaction("credit", 1000, "10/01/2023");
    expect(deposit.getStatmentFormat()).toBe("\n10/01/2023 || 1000.00 || ||");
  });
  it("when a withdrawal of 500 on 14/01/2023", () => {
    const withdrawal = new Transaction("debit", 500, "14/01/2023");
    expect(withdrawal.getStatmentFormat()).toBe("\n14/01/2023 || || 500.00 ||");
  });
});

describe("getValue - checks if transaction is credit or debit and returns correct + or - value", () => {
  it("when a deposit of 1000 on 10-01-2023", () => {
    const deposit = new Transaction("credit", 1000, "10/01/2023");
    expect(deposit.getValue()).toBe(1000);
  });
  it("when a withdrawal of 500 on 14/01/2023", () => {
    const withdrawal = new Transaction("debit", 500, "14/01/2023");
    expect(withdrawal.getValue()).toBe(-500);
  });
});

describe("checkType - checks if valid transaction type and returns", () => {
  it("true when a transaction type is credit", () => {
    const transaction = new Transaction("credit", 1000, "10/01/2023");
    expect(transaction.validType()).toBe(true);
  });
  it("true when a transaction type is debit", () => {
    const transaction = new Transaction("debit", 1000, "10/01/2023");
    expect(transaction.validType()).toBe(true);
  });
  it("false when a transaction type is incorrect", () => {
    const transaction = new Transaction("something", 1000, "10/01/2023");
    expect(transaction.validType()).toBe(false);
  });
});

describe("checkAmount - checks if valid transaction type and returns", () => {
  xit("true when a transaction type is credit", () => {
    const transaction = new Transaction("credit", 1000, "10/01/2023");
    expect(transaction.checkType()).toBe(true);
  });
  xit("true when a transaction type is debit", () => {
    const transaction = new Transaction("debit", 1000, "10/01/2023");
    expect(transaction.checkType()).toBe(true);
  });
  xit("false when a transaction type is incorrect", () => {
    const transaction = new Transaction("something", 1000, "10/01/2023");
    expect(transaction.checkType()).toBe(false);
  });
});
