const Transaction = require("./transaction");

class Account {
  constructor() {
    this.totalBalance = 0;
    this.allTransactions = [];
  }

  add(transaction) {
    this.#errorHandler(transaction);

    this.allTransactions.push(transaction);
    this.totalBalance += transaction.getValue();
  }

  printStatement() {
    const statement = this.#getHeaders() + this.#getTransactions();

    return statement;
  }

  #getHeaders() {
    return "date || credit || debit || balance";
  }

  #getTransactions() {
    this.currentBalance = 0;

    const transactions = this.allTransactions.map((transaction) => {
      const dateAndAmount = transaction.getStatmentFormat();
      const balance = this.#getBalanceFormat(transaction);

      return `${dateAndAmount} ${balance}`;
    });

    return transactions.reverse().join("");
  }

  #getBalanceFormat(transaction) {
    this.currentBalance += transaction.getValue();
    const balance = parseFloat(this.currentBalance).toFixed(2);

    return balance;
  }

  #errorHandler(transaction) {
    if (!transaction.validType()) {
      throw new Error(
        "Unable to complete transaction: invalid transaction type"
      );
    } else if (this.totalBalance + transaction.getValue() < 0) {
      throw new Error("Unable to complete transaction: insufficient funds");
    }
  }
}

module.exports = Account;
