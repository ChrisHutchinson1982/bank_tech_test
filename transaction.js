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
}

module.exports = Transaction;
