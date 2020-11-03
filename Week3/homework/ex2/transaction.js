const mysql = require('mysql');
const util = require('util');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
};

async function seedDatabase() {

  const startTransaction = `START TRANSACTION ;`;

  const updateAccountTable101 = `
  UPDATE account 
  SET balance = balance - 1000.00
  WHERE account_number = 101 ;`;
  const updateAccountTable102 = `
  UPDATE account 
  SET balance = balance + 1000.00
  WHERE account_number = 102 ;`;

  const insertIntoAccount_changes = `
  INSERT INTO account_changes
  (from_account,to_account,amount,changed_date,remark)
  VALUES
  (101,102,1000.00,"2020-10-31 14:17:00","for party");`;

  const commit = `COMMIT;`;
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));
    try {
         await execQuery(startTransaction);
         await execQuery(updateAccountTable101);
         await execQuery(updateAccountTable102);
         await execQuery(insertIntoAccount_changes);
         await execQuery(commit);
        
      connection.end();
    } catch (err) {
      console.error(err.message);
      connection.end();
    }
}
seedDatabase();