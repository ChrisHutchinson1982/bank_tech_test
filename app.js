const Account = require("./lib/account");
const Statement = require("./lib/statement");
const Transaction = require("./lib/transaction");

const App = {
  Account: Account,
  Statement: Statement,
  Transaction: Transaction,
};

module.exports = App;
