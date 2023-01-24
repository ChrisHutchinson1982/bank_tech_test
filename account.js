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

  #getHeaders() {
    return "date || credit || debit || balance";
  }

  #getTransactions() {
    // resets current balance
    this.currentBalance = 0;

    // maps transactions into correct format
    const transactions = this.allTransactions.map((transaction) => {
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
    // throws corresponding error if transaction is not a valid entry
    if (!transaction.validType()) {
      throw new Error(
        "Unable to complete transaction: invalid transaction type"
      );
    } else if (!transaction.validAmount()) {
      throw new Error(
        "Unable to complete transaction: invalid transaction amount"
      );
    } else if (!transaction.validDate()) {
      throw new Error(
        "Unable to complete transaction: invalid transaction date"
      );
    } else if (this.totalBalance + transaction.getValue() < 0) {
      throw new Error("Unable to complete transaction: insufficient funds");
    }
  }
}

module.exports = Account;
