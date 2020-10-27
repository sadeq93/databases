const mysql = require('mysql');
const util = require('util');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
};

async function seedDatabase() {
    const select_authors_numbers = `
        SELECT Research_Papers.paper_title AS Papers, count(author_paper.author_id) AS authors_num
        FROM Research_Papers
        JOIN author_paper
        ON Research_Papers.id = author_paper.paper_id
        group by Papers`;
    
    const sum_of_female_authors = `
        SELECT count(author_paper.paper_id) As sum_paper 
        from author_paper
        join authors
        on author_paper.author_id = authors.author_no
        where gender = "female"`;
    const select_average_hIndex = `
        SELECT university, avg(h_index) AS Average_h_index
        from authors
        group by university;`;
    const sum_of_university_paper = `
        SELECT authors.university, count(author_paper.paper_id) AS paper_num
        from authors
        join author_paper
        on authors.author_no = author_paper.author_id
        group by university`;
    const select_min_max_hIndex =`
        SELECT authors.university,min(authors.h_index) AS Minimum_h_index , max(authors.h_index) AS maximum_h_index
        from authors
        group by university;`;

    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));

    try {
        const selectAuthorsNumbers = await execQuery(select_authors_numbers);
        const sumFemaleAuthors = await execQuery(sum_of_female_authors);
        const selectAverage_hIndex = await execQuery(select_average_hIndex);
        const sumOfUniversityPaper = await execQuery(sum_of_university_paper);
        const selectMinMax_hIndex = await execQuery(select_min_max_hIndex);
        console.table(selectAuthorsNumbers);
        console.table(sumFemaleAuthors);
        console.table(selectAverage_hIndex);
        console.table(sumOfUniversityPaper);
        console.table(selectMinMax_hIndex);
      connection.end();
    } catch (err) {
      console.error(err.message);
      connection.end();
    }
}
seedDatabase();

