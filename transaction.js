class Transaction {
  constructor(type, amount, date) {
    this.type = type;
    this.amount = amount;
    this.date = date;
  }

  creditAmount() {
    if (this.type === "credit") {
      return this.amount;
    } else {
      return null;
    }
  }

  debitAmount() {
    if (this.type === "debit") {
      return this.amount;
    } else {
      return null;
    }
  }
}

module.exports = Transaction;
