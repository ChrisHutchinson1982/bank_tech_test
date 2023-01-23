const Transaction = require("./transaction");

class Account {
  constructor() {
    this.allTransactions = [];
    this.currentBalance = 0;
  }
  add(transaction) {
    this.currentBalance += transaction.getValue();

    this.allTransactions.push(
      `\n${transaction.date} || ${transaction.getAmountFormat(
        "credit"
      )}|| ${transaction.getAmountFormat("debit")}|| ${this.currentBalance}.00`
    );
  }
  printStatement() {
    const statement = this.#getHeaders() + this.#getTransactions();
    return statement;
  }

  #getTransactions() {
    const formatTransactions = this.allTransactions.reverse().join("");
    return formatTransactions;
  }

  #getHeaders() {
    return "date || credit || debit || balance";
  }
}

module.exports = Account;
