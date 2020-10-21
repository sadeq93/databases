const mysql = require("mysql");
const connections ={
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword"
  }
const db = mysql.createConnection(connections);
  db.connect((err) => {
    if(err) throw err;
    console.log('connecting ...')
  });
function run_mysql_query (mySQL_Command){
  db.query(mySQL_Command,(error,results,fields)=>{
    if (error) throw error ;
    // console.log(results)
});
}

run_mysql_query('DROP DATABASE IF EXISTS meetup');
run_mysql_query('CREATE DATABASE IF NOT EXISTS meetup');
run_mysql_query('use meetup');
run_mysql_query('CREATE TABLE Invitee (invitee_no INT, invitee_name VARCHAR(50), invited_by VARCHAR(50))');
run_mysql_query('CREATE TABLE Room (room_no INT, room_name VARCHAR(50),floor_number INT)');
run_mysql_query('CREATE TABLE Meeting (meeting_no INT, meeting_title VARCHAR(50), starting_time DATETIME, ending_time DATETIME,room_no INT )');

run_mysql_query('INSERT INTO Invitee VALUES ("1","Sami","Colan")');
run_mysql_query('INSERT INTO Invitee VALUES ("2","Nour","Yon")');
run_mysql_query('INSERT INTO Invitee VALUES ("3","Max","Naya")');
run_mysql_query('INSERT INTO Invitee VALUES ("4","Eva","Kila")');
run_mysql_query('INSERT INTO Invitee VALUES ("5","Karben","Med")');

run_mysql_query('INSERT INTO Room VALUES ("300","Red","3")');
run_mysql_query('INSERT INTO Room VALUES ("301","Blue","3")');
run_mysql_query('INSERT INTO Room VALUES ("302","Green","3")');
run_mysql_query('INSERT INTO Room VALUES ("303","Yellow","3")');
run_mysql_query('INSERT INTO Room VALUES ("304","White","3")');

run_mysql_query('INSERT INTO Meeting VALUES ("1","Meeting Title","2020-02-01 09:30:00","2020-02-01 11:30:00","302")');
run_mysql_query('INSERT INTO Meeting VALUES ("1","Meeting Title","2020-02-01 09:30:00","2020-02-01 11:30:00","301")');
run_mysql_query('INSERT INTO Meeting VALUES ("1","Meeting Title","2020-02-01 09:30:00","2020-02-01 11:30:00","304")');
run_mysql_query('INSERT INTO Meeting VALUES ("1","Meeting Title","2020-02-01 09:30:00","2020-02-01 11:30:00","300")');
run_mysql_query('INSERT INTO Meeting VALUES ("1","Meeting Title","2020-02-01 09:30:00","2020-02-01 11:30:00","301")');


db.end();