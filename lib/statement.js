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
      const dateAndAmount = this.#getStatmentFormat(transaction);
      const balance = this.#getBalanceFormat(currentBalance);

      return `${dateAndAmount} ${balance}`;
    });

    // reorders array to descending order and converts to string
    return transactions.reverse().join("");
  }

  #getStatmentFormat(transaction) {
    // formats date and amount string for statement
    return `\n${transaction.date} || ${this.#getAmountFormat(transaction)}||`;
  }

  #getBalanceFormat(currentBalance) {
    // formats to 2dp
    const balance = parseFloat(currentBalance).toFixed(2);

    return balance;
  }

  #getAmountFormat(transaction) {
    // formats amount to 2dp and aligns string for statement
    const amount = parseFloat(transaction.amount).toFixed(2);

    if (transaction.type === "credit") {
      return `${amount} || `;
    } else {
      return `|| ${amount} `;
    }
  }
}

module.exports = Statement;
