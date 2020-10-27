const mysql = require('mysql');
const util = require('util');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
};

async function seedDatabase() {
    const create_Research_Papers_table = `
        CREATE TABLE IF NOT EXISTS Research_Papers (
        id INT PRIMARY KEY auto_increment, 
        paper_title VARCHAR(50)NOT NULL UNIQUE ,
        conference VARCHAR(50) NOT NULL ,
        publish_date DATETIME NOT NULL);`;
    
    // the relationship between Authors and Research papers is Many-To-Many
    
    const CREATE_author_paper_table = `  
        CREATE TABLE IF NOT EXISTS author_paper (
        id INT PRIMARY KEY AUTO_INCREMENT,
        author_id INT NOT NULL ,
        paper_id INT NOT NULL,
        index(author_id),
        index(paper_id),
        FOREIGN KEY(author_id) REFERENCES Authors(author_no),
        FOREIGN KEY(paper_id) REFERENCES Research_Papers(id)
        );`;
    const insert_authors_values = `
    INSERT INTO Authors
    (author_name,university,date_of_birth,h_index,gender)
    VALUES
    ("Murad"    , "University of Arkansas"                   , "1984-06-05", 7.3, "male"    ),
    ("Liam"     , "Yale University"                          , "1992-11-21", 5.5, "male"    ),
    ("Olivia"   , "University Of Kufa"                       , "1996-04-14", 7.2, "female"  ),
    ("Noah"     , "University Of Baghdad"                    , "1974-08-28", 6.3, "male"    ),
    ("Oliver"   , "Vrije Universiteit Amsterdam"             , "1958-07-09", 3.8, "male"    ),
    ("Sophia"   , "Harvard University"                       , "1969-12-15", 5.2, "female"  ),
    ("Charlotte", "University of Alaska Fairbanks"           , "1991-03-24", 3.5, "female"  ),
    ("James"    , "Birmingham-Southern College"              , "1990-11-06", 9.3, "male"    ),
    ("Mia"      , "Samford University"                       , "1997-09-17", 6.3, "female"  ),
    ("Amelia"   , "University of Alabama"                    , "1949-04-20", 7.3, "female"  ),
    ("Ethan"    , "Massachusetts Institute of Technology"    , "1993-01-18", 8.6, "male"    ),
    ("Mason"    , "Harvard University"                       , "1991-07-29", 9.5, "male"    ),
    ("William"  , "University of Arkansas"                   , "1970-11-13", 4.9, "male"    ),
    ("Isabella" , "University of Alabama"                    , "1985-05-03", 1.8, "female"  ),
    ("Emma"     , "Harvard University"                       , "1979-12-26", 6.4, "female"  );`;

const update_collaborators_values = `
    update authors set Collaborator = (case
    when author_no=1 then 2
    when author_no=2 then 1
    when author_no=3 then 1
    when author_no=4 then 5    
    when author_no=5 then 4
    when author_no=6 then 10
    when author_no=7 then 10
    when author_no=8 then 10    
    when author_no=9 then 10
    when author_no=10 then 10
    when author_no=11 then 12
    when author_no=12 then 11    
    when author_no=13 then 14
    when author_no=14 then 5
    when author_no=15 then 5  
    end)
    WHERE author_no IN (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);`;

    const insert_Research_Papers_values = `INSERT INTO Research_Papers
    (paper_title,conference,publish_date) VALUES
    ("title_1","conference_1","2020-06-05 19-00-00"),
    ("title_2","conference_2","2020-06-05 19-00-00"),
    ("title_3","conference_3","2020-06-05 19-00-00"),
    ("title_4","conference_4","2020-06-05 19-00-00"),
    ("title_5","conference_5","2020-06-05 19-00-00"),
    ("title_6","conference_6","2020-06-05 19-00-00"),
    ("title_7","conference_7","2020-06-05 19-00-00"),
    ("title_8","conference_8","2020-06-05 19-00-00"),
    ("title_9","conference_9","2020-06-05 19-00-00"),
    ("title_10","conference_10","2020-06-05 19-00-00"),
    ("title_11","conference_11","2020-06-05 19-00-00"),
    ("title_12","conference_12","2020-06-05 19-00-00"),
    ("title_13","conference_13","2020-06-05 19-00-00"),
    ("title_14","conference_14","2020-06-05 19-00-00"),
    ("title_15","conference_15","2020-06-05 19-00-00"),
    ("title_16","conference_16","2020-06-05 19-00-00"),
    ("title_17","conference_17","2020-06-05 19-00-00"),
    ("title_18","conference_18","2020-06-05 19-00-00"),
    ("title_19","conference_19","2020-06-05 19-00-00"),
    ("title_20","conference_20","2020-06-05 19-00-00"),
    ("title_21","conference_21","2020-06-05 19-00-00"),
    ("title_22","conference_22","2020-06-05 19-00-00"),
    ("title_23","conference_23","2020-06-05 19-00-00"),
    ("title_24","conference_24","2020-06-05 19-00-00"),
    ("title_25","conference_25","2020-06-05 19-00-00"),
    ("title_26","conference_26","2020-06-05 19-00-00"),
    ("title_27","conference_27","2020-06-05 19-00-00"),
    ("title_28","conference_28","2020-06-05 19-00-00"),
    ("title_29","conference_29","2020-06-05 19-00-00"),
    ("title_30","conference_30","2020-06-05 19-00-00");`;
const insert_author_paper_values = `INSERT INTO author_paper
    (author_id,paper_id)
    VALUES
    (1, 5),
    (2, 5),
    (3, 5),
    (4, 7),
    (5, 7),
    (6, 30),
    (7, 30),
    (8, 30),
    (9, 30),
    (10, 30),
    (11, 25),
    (12, 25),
    (13, 7),
    (14, 7),
    (15, 7);`;
    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));
    
    try {
         await execQuery(create_Research_Papers_table);
         await execQuery(CREATE_author_paper_table);
         await execQuery(insert_authors_values);
         await execQuery(update_collaborators_values);
         await execQuery(insert_Research_Papers_values);
         await execQuery(insert_author_paper_values);
      connection.end();
    } catch (err) {
      console.error(err.message);
      connection.end();
    }
}
seedDatabase();
