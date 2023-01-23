class Account {
  constructor() {
    this.allTransactions = [];
    this.currentBalance = 0;
  }
  add(transaction) {
    this.currentBalance += transaction.amount;
    this.allTransactions.push(
      `\n${transaction.date} || ${transaction.amount}.00 || || ${this.currentBalance}.00`
    );
  }
  printStatement() {
    console.log(this.#getHeaders() + this.getTransactions());
    const statement = this.#getHeaders() + this.getTransactions();
    return statement;
  }

  getTransactions() {
    return this.allTransactions.reverse().join("");
  }

  #getHeaders() {
    return "date || credit || debit || balance";
  }
}

module.exports = Account;
