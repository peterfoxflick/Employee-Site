/**
 * Created by Mando0975 on 7/3/2017.
 */

// Creates and exports a connection pool

let mysql = require('mysql');
const SQL = require('sql-template-strings');

try {
    let connString = //require('./connectionString');
    {
	    host: 'localhost',
		user: 'nodeUser', 
		password: 'secretPassword',
		database: 'employee_site'

    };

    module.exports = mysql.createPool(connString);
  //   {
  //   pool = mysql.createPool({
	 //    host: 'localhost',
		// user: 'nodeUser', 
		// password: 'secretPassword',
		// database: 'employee_site'

  //   });

  //   pool.query(SQL`SELECT passwords.Name, passwords.Description, password.Img, passwords.Pass, passwords.Url 
  //                FROM passwords 
  //                ORDER BY Name`, (err, result) => {
  //   if(err) {
  //   	console.log(err);
  //     //callback(err);
  //   } else {
  //   	console.log(result);
  //     //callback(null, result);
  //   }
  // });

} catch (e) {
	console.log(e)
    console.log('WARNING: Could not connect to database. Certain site functionality will now be broken')
    module.exports = null;
}
