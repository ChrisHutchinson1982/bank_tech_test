class Transaction {
  constructor(type, amount, date) {
    this.type = type;
    this.amount = amount;
    this.date = date;
  }

  getValue() {
    // amends amount to negative value if debit
    if (this.type === "credit") {
      return this.amount;
    } else {
      return -this.amount;
    }
  }

  getStatmentFormat() {
    // formats date and amount string for statement
    return `\n${this.date} || ${this.#getAmountFormat()}||`;
  }

  validType() {
    // checks in type is valid (i.e. credit or debit)
    return this.type === "credit" || this.type === "debit";
  }

  validAmount() {
    // checks if amount is positive number
    return !isNaN(this.amount) && this.amount > 0;
  }

  validDate() {
    // checks if date is DD/MM/YYYY
    const dateFormat =
      /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/;

    if (this.date.match(dateFormat)) {
      return true;
    } else {
      return false;
    }
  }

  #getAmountFormat() {
    // formats amount to 2dp and aligns string for statement
    const amount = parseFloat(this.amount).toFixed(2);

    if (this.type === "credit") {
      return `${amount} || `;
    } else {
      return `|| ${amount} `;
    }
  }
}

module.exports = Transaction;
