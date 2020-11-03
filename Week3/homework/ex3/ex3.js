// while using prompt with this function you will take advantage of mySQL injection [see line 14].
function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = ${code}`,
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }
/*
prompt: table:  country
prompt: country:  iraq
prompt: code:  "irq";show tables
result ==>
 SELECT Population FROM country WHERE Name = 'iraq' and code = "irq";show tables;
[ RowDataPacket { Population: 23115000 } ]
[
  RowDataPacket { Tables_in_new_world: 'city' },
  RowDataPacket { Tables_in_new_world: 'country' },
  RowDataPacket { Tables_in_new_world: 'countrylanguage' }
]
*/


//no longer vulnerable to SQL injection
function getPopulation(country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ? WHERE Name = ? and code = ?`,[country, name, code],
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }