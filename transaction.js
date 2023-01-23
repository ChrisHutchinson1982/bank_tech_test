class Transaction {
  constructor(type, amount, date) {
    this.type = type;
    this.amount = amount;
    this.date = date;
  }

  creditAmount() {
    if (this.type === "credit") {
      return `${parseFloat(this.amount).toFixed(2)} `;
    } else {
      return "";
    }
  }

  debitAmount() {
    if (this.type === "debit") {
      return `${parseFloat(this.amount).toFixed(2)} `;
    } else {
      return "";
    }
  }
}

module.exports = Transaction;
