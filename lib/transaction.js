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
}

module.exports = Transaction;
