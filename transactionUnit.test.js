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

describe("validType - checks if valid transaction type and returns", () => {
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

describe("validAmount - checks if valid transaction amount and returns", () => {
  it("true when a transaction amount is a number", () => {
    const transaction = new Transaction("credit", 1000, "10/01/2023");
    expect(transaction.validAmount()).toBe(true);
  });
  it("true when a transaction amount is a number with decimal places", () => {
    const transaction = new Transaction("debit", 1000.01, "10/01/2023");
    expect(transaction.validAmount()).toBe(true);
  });
  it("false when a transaction amount is string", () => {
    const transaction = new Transaction("debit", "something", "14/01/2023");
    expect(transaction.validAmount()).toBe(false);
  });
  it("true when a transaction amount is a postive number", () => {
    const transaction = new Transaction("credit", 1000, "10/01/2023");
    expect(transaction.validAmount()).toBe(true);
  });
  it("false when a transaction amount is negative", () => {
    const transaction = new Transaction("credit", -1000, "10/01/2023");
    expect(transaction.validAmount()).toBe(false);
  });
  it("false when a transaction amount is zero", () => {
    const transaction = new Transaction("credit", 0, "10/01/2023");
    expect(transaction.validAmount()).toBe(false);
  });
});

describe("validDate - checks if valid transaction date and returns", () => {
  it("true when a transaction date is DD/MM/YYYY", () => {
    const transaction = new Transaction("credit", 1000, "10/01/2023");
    expect(transaction.validDate()).toBe(true);
  });
});
