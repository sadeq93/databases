var prompt = require('prompt');
var mysql      = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'new_world',
  multipleStatements: true
});

const execQuery = util.promisify(connection.query.bind(connection))
const input = util.promisify(prompt.get.bind(this))

async function queryDatabase() {

    var input_name = "";
    var input_code = "";
    prompt.start();
    try {
        const result = await input(['name','code']);
        input_name = result.name;
        input_code = result.code;

       
        const select_query = `SELECT Population FROM Country WHERE Name = '${input_name}' and  code = '${input_code}'`

        connection.connect();
        console.log(select_query);
        const results = await execQuery(select_query,input_name,input_code);
       
        for (r of results) {
            console.log(r);
        }
    } catch(error) {
        console.error(error);
    }
    
    connection.end();
}

queryDatabase();
