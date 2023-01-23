class Account {
  constructor() {
    this.allTransactions = [];
  }
  add(transaction) {
    this.allTransactions = `\n${transaction.date} || ${transaction.amount}.00 || || ${transaction.amount}.00`;
  }
  printStatement() {
    console.log("date || credit || debit || balance" + this.allTransactions);
    return "date || credit || debit || balance" + this.allTransactions;
  }
}

module.exports = Account;
