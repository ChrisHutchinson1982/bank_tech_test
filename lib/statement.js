class Statement {
  constructor(account) {
    this.account = account;
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
    const transactions = this.account.sortByDate().map((transaction) => {
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
}

module.exports = Statement;
