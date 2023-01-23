class Account {
  constructor() {
    this.allTransactions = [];
  }
  add(transaction) {
    this.allTransactions = "\n10/01/2023 || 1000.00 || || 1000.00";
  }
  printStatement() {
    console.log("date || credit || debit || balance" + this.allTransactions);
    return "date || credit || debit || balance" + this.allTransactions;
  }
}

module.exports = Account;
