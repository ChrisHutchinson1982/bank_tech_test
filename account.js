const Transaction = require("./transaction");

class Account {
  constructor() {
    this.allTransactions = [];
    this.currentBalance = 0;
  }
  add(transaction) {
    const date = transaction.date;
    const credit = transaction.getAmountFormat("credit");
    const debit = transaction.getAmountFormat("debit");
    const balance = this.#getBalance(transaction);

    this.allTransactions.push(`\n${date} || ${credit}|| ${debit}|| ${balance}`);
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

  #getBalance(transaction) {
    this.currentBalance += transaction.getValue();
    const balance = parseFloat(this.currentBalance).toFixed(2);
    return balance;
  }
}

module.exports = Account;
