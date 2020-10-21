const mysql = require("mysql");
const connections = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world"
}
const db = mysql.createConnection(connections);
db.connect((err) => {
  if (err) throw err;
  console.log('connecting ...')
});
function run_mysql_query(mySQL_Command) {
  db.query(mySQL_Command, (error, results, fields) => {
    if (error) throw error;
    console.table(results)
  });
}

run_mysql_query('SELECT Name FROM country WHERE Population > 8000000');
run_mysql_query('SELECT Name FROM country WHERE name LIKE "%land%"');
run_mysql_query('SELECT Name FROM country WHERE Population BETWEEN 500000 AND 1000000');
run_mysql_query('SELECT Name FROM country ORDER BY SurfaceArea DESC');
run_mysql_query('SELECT Name FROM City where CountryCode = "NLD"');
run_mysql_query('SELECT Population FROM City where Name = "Rotterdam"');
run_mysql_query('SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10');
run_mysql_query('SELECT Name FROM country ORDER BY Population DESC LIMIT 10');
run_mysql_query('SELECT Population FROM country ORDER BY Population DESC LIMIT 1');
db.end();