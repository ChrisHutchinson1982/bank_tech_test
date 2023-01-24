class Account {
  constructor() {
    this.totalBalance = 0;
    this.allTransactions = [];
  }

  add(transaction) {
    // checks if valid entry
    this.#errorHandler(transaction);

    // if valid, adds
    this.allTransactions.push(transaction);
    // and updates total balance
    this.totalBalance += transaction.getValue();
  }

  printStatement() {
    // joins headers and transactions strings
    const statement = this.#getHeaders() + this.#getTransactions();

    return statement;
  }

  sortTransactionsByDate() {
    return this.allTransactions.sort((a, b) => {
      // '01/03/2014'.split('/')
      // gives ["01", "03", "2014"]
      a = a.date.split("/");
      b = b.date.split("/");
      return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
    });
  }

  #getHeaders() {
    return "date || credit || debit || balance";
  }

  #getTransactions() {
    // resets current balance
    this.currentBalance = 0;

    // maps transactions into correct format
    const transactions = this.sortTransactionsByDate().map((transaction) => {
      // gets date and amount string
      const dateAndAmount = transaction.getStatmentFormat();
      // and current balance
      const balance = this.#getBalanceFormat(transaction);

      return `${dateAndAmount} ${balance}`;
    });

    // reorders to descending order and converts to string
    return transactions.reverse().join("");
  }

  #getBalanceFormat(transaction) {
    // updates current balance
    this.currentBalance += transaction.getValue();
    // formats to 2dp
    const balance = parseFloat(this.currentBalance).toFixed(2);

    return balance;
  }

  #errorHandler(transaction) {
    const errorMessage = "Unable to complete transaction: ";

    // throws corresponding error if transaction is not a valid entry
    if (!transaction.validType()) {
      throw new Error(`${errorMessage}invalid transaction type`);
    } else if (!transaction.validAmount()) {
      throw new Error(`${errorMessage}invalid transaction amount`);
    } else if (!transaction.validDate()) {
      throw new Error(`${errorMessage}invalid transaction date`);
    } else if (this.totalBalance + transaction.getValue() < 0) {
      throw new Error(`${errorMessage}insufficient funds`);
    }
  }
}

module.exports = Account;
