const mysql = require('mysql');
const util = require('util');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
};

async function seedDatabase() {

const createAccountTable = `
  CREATE TABLE IF NOT EXISTS account (
  account_number  INT         PRIMARY KEY AUTO_INCREMENT,
  balance         DECIMAL(8,2)  NOT NULL
  );`;
const createAccount_changesTable = `
  CREATE TABLE IF NOT EXISTS account_changes (
  change_number    INT            PRIMARY KEY AUTO_INCREMENT,
  from_account     INT            NOT NULL REFERENCES account(account_number),
  to_account       INT            NOT NULL REFERENCES account(account_number),
  amount           DECIMAL(8,2)   NOT NULL,
  changed_date     DATETIME       NOT NULL,
  remark           VARCHAR(100)   NOT NULL
  );`;





    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));
    try {
         await execQuery(createAccountTable);
         await execQuery(createAccount_changesTable);
        
      connection.end();
    } catch (err) {
      console.error(err.message);
      connection.end();
    }
}
seedDatabase();