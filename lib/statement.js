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
    let currentBalance = 0;

    // maps transactions into correct format for statement
    const transactions = this.account.sortByDate().map((transaction) => {
      currentBalance += transaction.getValue();
      // format date, amount and balance
      const dateAndAmount = transaction.getStatmentFormat();
      const balance = this.#getBalanceFormat(currentBalance);

      return `${dateAndAmount} ${balance}`;
    });

    // reorders array to descending order and converts to string
    return transactions.reverse().join("");
  }

  #getBalanceFormat(currentBalance) {
    // formats to 2dp
    const balance = parseFloat(currentBalance).toFixed(2);

    return balance;
  }
}

module.exports = Statement;
