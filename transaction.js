class Transaction {
  constructor(type, amount, date) {
    this.type = type;
    this.amount = amount;
    this.date = date;
  }

  getValue() {
    if (this.type === "credit") {
      return this.amount;
    } else {
      return -this.amount;
    }
  }

  getStatmentFormat() {
    return `\n${this.date} || ${this.#getAmountFormat()}||`;
  }

  checkType() {
    return this.type === "credit";
  }

  #getAmountFormat() {
    const amount = parseFloat(this.amount).toFixed(2);

    if (this.type === "credit") {
      return `${amount} || `;
    } else {
      return `|| ${amount} `;
    }
  }
}

module.exports = Transaction;
