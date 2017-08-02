const pool = require('../dbconnect');
const SQL = require('sql-template-strings');
const bcrypt = require('bcrypt-nodejs');

function addUser(userInfo, callback) {
  let hash = bcrypt.hashSync(userInfo.password);
  pool.query(SQL`INSERT INTO employee_info (First_Name, Last_Name, Email, Assignment, Full_Name, Username, Password)
                 VALUES (${ userInfo.fname}, ${ userInfo.lname }, ${ userInfo.email }, ${ userInfo.assignment },
                         ${ userInfo.fname + " " + userInfo.lname}, ${ userInfo.username }, ${ hash });`,
      (err, result) => {
        if(err) {
          callback(err);
        } else {
          callback(null);
        }
  });
}

module.exports = addUser;