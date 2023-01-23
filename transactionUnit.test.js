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

describe("checks if transaction is credit or debit and format to 2dp", () => {
  it("when a deposit of 1000 on 10-01-2023", () => {
    const deposit = new Transaction("credit", 1000, "10/01/2023");
    expect(deposit.creditAmount()).toBe("1000.00 ");
    expect(deposit.debitAmount()).toBe("");
  });
  it("when a withdrawal of 500 on 14/01/2023", () => {
    const withdrawal = new Transaction("debit", 500, "14/01/2023");
    expect(withdrawal.debitAmount()).toBe("500.00 ");
    expect(withdrawal.creditAmount()).toBe("");
  });
});
