const mysql = require('mysql');
const util = require('util');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
};

async function seedDatabase() {
    const createAuthorsTable =` 
        CREATE TABLE IF NOT EXISTS Authors (
        author_no int NOT NULL AUTO_INCREMENT,
        author_name VARCHAR(55) NOT NULL,
        university VARCHAR(55) NOT NULL,
        date_of_birth date NOT NULL,
        h_index DECIMAL(2,1) NOT NULL,
        gender ENUM('male', 'female') NOT NULL,
        PRIMARY KEY (author_no)
        );`;

    const addCollaboratorColumn = `
        ALTER TABLE authors
        ADD Collaborator INT,
        ADD CONSTRAINT FOREIGN KEY(Collaborator) REFERENCES authors(author_no);`;

    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));

    try {
         await execQuery(createAuthorsTable);
         await execQuery(addCollaboratorColumn);
      connection.end();
    } catch (err) {
      console.error(err.message);
      connection.end();
    }
}
seedDatabase();
