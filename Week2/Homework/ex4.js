const mysql = require('mysql');
const util = require('util');

const CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
};

async function seedDatabase() {
    const countOfAuthors = `
        SELECT Research_Papers.paper_title AS Papers, count(author_paper.author_id) AS authors_num
        FROM Research_Papers
        JOIN author_paper
        ON Research_Papers.id = author_paper.paper_id
        group by Research_Papers.paper_title`;
    
    const sumOfFemaleAuthors = `
        SELECT count(author_paper.paper_id) As sum_paper 
        from author_paper
        join authors
        on author_paper.author_id = authors.author_no
        where gender = "female"`;
    const selectAverageHindex = `
        SELECT university, avg(h_index) AS Average_h_index
        from authors
        group by university;`;
    const sumOfUniversityPaper = `
        SELECT authors.university, count(author_paper.paper_id) AS paper_num
        from authors
        join author_paper
        on authors.author_no = author_paper.author_id
        group by university`;
    const selectMinAndMaxHindex =`
        SELECT authors.university,min(authors.h_index) AS Minimum_h_index , max(authors.h_index) AS maximum_h_index
        from authors
        group by university;`;

    const connection = mysql.createConnection(CONNECTION_CONFIG);
    const execQuery = util.promisify(connection.query.bind(connection));

    try {
        const count_of_authors = await execQuery(countOfAuthors);
        const sum_of_female_authors = await execQuery(sumOfFemaleAuthors);
        const select_average_hIndex = await execQuery(selectAverageHindex);
        const sum_of_university_paper = await execQuery(sumOfUniversityPaper);
        const select_min_max_hIndex = await execQuery(selectMinAndMaxHindex);
        console.table(count_of_authors);
        console.table(sum_of_female_authors);
        console.table(select_average_hIndex);
        console.table(sum_of_university_paper);
        console.table(select_min_max_hIndex);
      connection.end();
    } catch (err) {
      console.error(err.message);
      connection.end();
    }
}
seedDatabase();

