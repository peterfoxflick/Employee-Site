/**
 * Created by Mando0975 on 7/13/2017.
 */
// console.log('made it to userLogin');
const pool = require('../dbconnect');
const SQL = require('sql-template-strings');
const bcrypt = require('bcrypt');

/**
 * A function that logs that checks against the db
 * and returns the user info for a session variable.
 * @param userLogin
 * @param callback
 */
function userLogin(userLogin, callback) {

  pool.query(SQL`SELECT * FROM employee_info WHERE username = ${ userLogin.username };`, (err, result)=>{
    if(err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, result);
    }
  });

}

module.exports = userLogin;