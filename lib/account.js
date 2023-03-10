class Account {
  constructor() {
    this.allTransactions = [];
  }

  add(transaction) {
    // checks if valid entry
    this.#errorHandler(transaction);

    // if valid, adds transaction
    this.allTransactions.push(transaction);
  }

  sortByDate() {
    return this.allTransactions.sort((a, b) => {
      // '01/03/2014'.split('/')
      // gives ["01", "03", "2014"]
      a = a.date.split("/");
      b = b.date.split("/");
      return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
    });
  }

  getBalance() {
    let balance = 0;

    this.allTransactions.forEach((transaction) => {
      balance += transaction.getValue();
    });

    return balance;
  }

  #errorHandler(transaction) {
    const errorMessage = "Unable to complete transaction: ";

    // throws corresponding error if not a valid entry
    if (!transaction.validType()) {
      throw new Error(`${errorMessage}invalid transaction type`);
    } else if (!transaction.validAmount()) {
      throw new Error(`${errorMessage}invalid transaction amount`);
    } else if (!transaction.validDate()) {
      throw new Error(`${errorMessage}invalid transaction date`);
    } else if (this.getBalance() + transaction.getValue() < 0) {
      throw new Error(`${errorMessage}insufficient funds`);
    }
  }
}

module.exports = Account;
