const pool = require('../dbconnect');
const SQL = require('sql-template-strings');
const bcrypt = require('bcrypt-nodejs');

/**
 * Adds a user to the employee table. Also hashes the provided password.
 *
 * @param userInfo - and object containing the following properties:
 *                    - fname: First name of user
 *                    - lname: Laste name of user
 *                    - email: Email of user
 *                    - assignment: FTC role ie ISR, Assistant, etc
 *                    - username: the desired username
 *                    - password: a plain text password that will be hashed
 * @param callback
 */
function addUser(userInfo, callback) {
  // hash the plaintext password
  let hash = bcrypt.hashSync(userInfo.password);
  pool.query(SQL`INSERT INTO employee_info (First_Name, Last_Name, Email, Assignment, Full_Name, Username, Password)
                 VALUES (${ userInfo.fname}, ${ userInfo.lname }, ${ userInfo.email }, ${ userInfo.assignment },
                         ${ userInfo.fname + " " + userInfo.lname}, ${ userInfo.username }, ${ hash });`,
      (err, result) => {
        if(err) {
          callback(err);
        } else {
          callback(null, result.insertId);
        }
  });
}

module.exports = addUser;