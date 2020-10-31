const mysql = require('mysql');
const util = require('util');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
};

async function seedDatabase() {


  const insertIntoAccount = `
  INSERT INTO Members
  (member_name,member_address)
  VALUES 
  (100     ,500.29    ),
  (101     ,5000.71   ),
  (102     ,1000.00   );`;


    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));
    try {
         await execQuery(insertIntoAccount);
         await execQuery(insertIntoAccount_changes);
        
      connection.end();
    } catch (err) {
      console.error(err.message);
      connection.end();
    }
}
seedDatabase();