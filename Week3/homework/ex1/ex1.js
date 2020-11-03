/*
          *************************************************** 
              ******************************************
                        ***********************
         Kindly see the image in ex1 folder called "ERD-sketch"
           to see how I started for designing the databases
                        ***********************
               *****************************************          
          ***************************************************
*/

const mysql = require('mysql');
const util = require('util');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
};

async function seedDatabase() {
  /*


1:- by make each field take one value even if the rows will repeated .
for example :
1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1    | Curry
1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C2    | Cake

OR practical way as you will see later by drop (member_address,food_code,food_description) Tables 
because it has multiple values in one rowe with same Data Type or not 
e.g
{325 Max park} in "member_address" column,
{C1, C2} in "food_code"column,
{Curry, Cake} in "food_description" column.

then :  create a different tables .

2 :-
super keys :
- member_id OR {member_id + the rest of the columns in the table}
- {member_id,member_name} OR {member_id,member_name + the rest of the columns in the table}

candidate key :
- member_id

primary key : 
- member_id


3:- in this case I should design database dose not has partial dependency
which means non-prime attribute depend on part of primary key .

4- by avoiding transitive Dependency which means non-prime attribute depend on non-prime attribute.

*/


 const createAddressesTable = `
  CREATE TABLE IF NOT EXISTS Addresses (
  address_id   INT         PRIMARY KEY AUTO_INCREMENT,
  street_name  VARCHAR(50) NOT NULL,
  house_no     INT         NOT NULL,
  addition     VARCHAR(10)         ,
  zip_code     VARCHAR(10) NOT NULL,
  city_name    VARCHAR(50) NOT NULL,
  country_code CHAR(3)     NOT NULL
  );`;
 const insertIntoAddresses = `
 INSERT INTO Addresses
 (street_name,house_no,addition,zip_code,city_name,country_code)
 VALUES 
 ("Max park"     ,325    ,"A.2"  ,"1066 EA","Rotterdam"  ,"NLD"),
 ("Hudson lane"  ,6      ,null   ,"2346 HM","Haarlem"    ,"NLD"),
 ("6th Ave"      ,26     ,"F.42" ,"1065 EC","Zwolle"     ,"NLD"),
 ("John St"      ,32     ,null   ,"4366 DQ","Nieuwkoop"  ,"NLD"),
 ("Pixar St"     ,11     ,null   ,"2456 EV","Utrecht"    ,"NLD"),
 ("8th Ave"      ,3      ,null   ,"7253 KP","Amsterdam"  ,"NLD"),
 ("Vivaldi St"   ,2      ,"B.101","6625 SY","Breda"      ,"NLD"),
 ("Peter St"     ,17     ,null   ,"7235 JR","Maastricht" ,"NLD");`;

 const createMembersTable = `
  CREATE TABLE IF NOT EXISTS Members (
  member_id        INT         PRIMARY KEY AUTO_INCREMENT,
  member_name      VARCHAR(50) NOT NULL,
  member_address   INT         NOT NULL REFERENCES Addresses(address_id)
  );`;
 const insertIntoMembers = `
 INSERT INTO Members
 (member_name,member_address)
 VALUES 
 ("Amit"     ,1),
 ("Ben"      ,2),
 ("Cristina" ,3),
 ("Dan"      ,4),
 ("Ema"      ,5),
 ("Fatima"   ,5),
 ("Gabor"    ,7),
 ("Hema"     ,8);`;

 const createVenuesTable = `
  CREATE TABLE IF NOT EXISTS Venues (
  venue_code        VARCHAR(10) PRIMARY KEY ,
  venue_description VARCHAR(50) NOT NULL
  );`;
 const insertIntoVenues = `
 INSERT INTO Venues
 (venue_code,venue_description)
 VALUES 
 ("B01","Grand Ball Room"),
 ("B02","Zoku Roof Top"),
 ("B03","Goat Farm"),
 ("B04","Mama's Kitchen"),
 ("B05","Hungry Hungary");`;

 const createFoodTable = `
  CREATE TABLE IF NOT EXISTS Food (
  food_code        VARCHAR(10) PRIMARY KEY ,
  food_description VARCHAR(50) NOT NULL
  );`;
 const insertIntoFood = `
 INSERT INTO Food
 (food_code,food_description)
 VALUES 
 ("C1","Curry"),
 ("C2","Cake"),
 ("S1","Soup"),
 ("P1","PIE"),
 ("P2","Pasca"),
 ("T1","TEA"),
 ("M1","Mousse"),
 ("G1","Goulash");`;

 const createDinnerTable = `
  CREATE TABLE IF NOT EXISTS Dinner (
  dinner_id    VARCHAR(10)     PRIMARY KEY ,
  dinner_date  DATETIME        NOT NULL,
  venue_id     VARCHAR(10)     NOT NULL REFERENCES Venues(venue_code) 
  );`;
 const insertIntoDinner = `
 INSERT INTO Dinner
 (dinner_id,dinner_date,venue_id)
 VALUES 
 ("D00001001","2020-03-15 18:30:00","B01"),
 ("D00001002","2020-03-15 20:00:00","B02"),
 ("D00001003","2020-03-20 18:00:00","B03"),
 ("D00001004","2020-03-20 21:00:00","B04"),
 ("D00001005","2020-03-20 17:30:00","B05");`;

 const createMembers_dinnerTable = `
  CREATE TABLE IF NOT EXISTS Members_dinner (
  members_id   VARCHAR(10) NOT NULL REFERENCES Members(member_id) ,
  dinner_id    VARCHAR(50) NOT NULL REFERENCES Dinner(dinner_id),
  PRIMARY KEY (members_id,dinner_id)
  );`;
 const insertIntoMembers_dinner = `
 INSERT INTO Members_dinner
 (members_id,dinner_id)
 VALUES 
 (1,"D00001001"),
 (2,"D00001002"),
 (3,"D00001002"),
 (4,"D00001003"),
 (5,"D00001003"),
 (6,"D00001004"),
 (7,"D00001005"),
 (8,"D00001003");`;

 const createFood_dinnerTable = `
  CREATE TABLE IF NOT EXISTS Food_dinner (
  food_id      VARCHAR(10) NOT NULL REFERENCES Food(food_code) ,
  dinner_id    VARCHAR(50) NOT NULL REFERENCES Dinner(dinner_id),
  PRIMARY KEY (food_id,dinner_id)
  );`;
 const insertIntoFood_dinner = `
 INSERT INTO Food_dinner
 (food_id,dinner_id)
 VALUES 
 ("C1","D00001001"),
 ("C2","D00001001"),
 
 ("S1","D00001002"),
 ("C2","D00001002"),
 
 ("P1","D00001003"),
 ("T1","D00001003"),
 ("M1","D00001003"),
 
 ("F1","D00001004"),
 ("M1","D00001004"),
 
 ("G1","D00001005"),
 ("P2","D00001005");`;
 

 const connection = mysql.createConnection(CONNECTION_CONFIG);
 const execQuery = util.promisify(connection.query.bind(connection));
 try {
    await execQuery(createAddressesTable);
    await execQuery(insertIntoAddresses);
  
    await execQuery(createMembersTable);
    await execQuery(insertIntoMembers);
  
    await execQuery(createVenuesTable);
    await execQuery(insertIntoVenues);
  
    await execQuery(createFoodTable);
    await execQuery(insertIntoFood);
  
    await execQuery(createDinnerTable);
    await execQuery(insertIntoDinner);
  
    await execQuery(createMembers_dinnerTable);
    await execQuery(insertIntoMembers_dinner);
  
    await execQuery(createFood_dinnerTable);
    await execQuery(insertIntoFood_dinner);
        
    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}
seedDatabase();