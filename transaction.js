class Transaction {
  constructor(type, amount, date) {
    this.type = type;
    this.amount = amount;
    this.date = date;
  }

  getAmountFormat(type) {
    if (this.type === type) {
      return `${parseFloat(this.amount).toFixed(2)} `;
    } else {
      return "";
    }
  }

  getValue() {
    if (this.type === "debit") {
      return -this.amount;
    } else {
      return this.amount;
    }
  }
}

module.exports = Transaction;
