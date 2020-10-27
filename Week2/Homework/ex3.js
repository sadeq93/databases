const mysql = require('mysql');
const util = require('util');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
};

async function seedDatabase() {
    const  self_Join_query =
    `SELECT auth.author_name AS authors , coll.author_name AS collaborators
    FROM authors AS auth 
    JOIN authors AS coll 
    ON auth.collaborator = coll.author_no;`;
    
    const many_to_many = `SELECT authors.author_name  AS author, Research_Papers.paper_title AS Research_Paper
    from authors 
    LEFT JOIN  author_paper
    ON authors.author_no = author_paper.author_id
    LEFT JOIN Research_Papers
    ON Research_Papers.id = author_paper.paper_id;`;

    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));

    try {
        const selfJoinQuery = await execQuery(self_Join_query);
        const manyToMany = await execQuery(many_to_many);
        console.table(selfJoinQuery);
        console.table(manyToMany);
        connection.end();
    } catch (err) {
      console.error(err.message);
      connection.end();
    }
}
seedDatabase();
