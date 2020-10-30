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

run_mysql_query('SELECT Name FROM country WHERE Population > 8000000;');                    //1
run_mysql_query('SELECT Name FROM country WHERE name LIKE "%land%";');                      //2
run_mysql_query('SELECT Name FROM country WHERE Population BETWEEN 500000 AND 1000000;');   //3
run_mysql_query('SELECT Name FROM country WHERE Continent = "Europe";');                    //4
run_mysql_query('SELECT Name FROM country ORDER BY SurfaceArea DESC;');                     //5
run_mysql_query('SELECT Name FROM City where CountryCode = "NLD";');                        //6
run_mysql_query('SELECT Population FROM City where Name = "Rotterdam";');                   //7
run_mysql_query('SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10;');            //8
run_mysql_query('SELECT Name FROM country ORDER BY Population DESC LIMIT 10;');             //9
run_mysql_query('SELECT sum(Population) AS population_world FROM country;');                //10
db.end();