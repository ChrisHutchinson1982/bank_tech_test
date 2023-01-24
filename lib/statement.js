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
    this.currentBalance = 0;

    // maps transactions into correct format for statement
    const transactions = this.account.sortByDate().map((transaction) => {
      // gets date, amount and current balance
      const dateAndAmount = transaction.getStatmentFormat();
      const balance = this.#getBalanceFormat(transaction);

      return `${dateAndAmount} ${balance}`;
    });

    // reorders array to descending order and converts to string
    return transactions.reverse().join("");
  }

  #getBalanceFormat(transaction) {
    // updates current balance and formats to 2dp
    this.currentBalance += transaction.getValue();
    const balance = parseFloat(this.currentBalance).toFixed(2);

    return balance;
  }
}

module.exports = Statement;
