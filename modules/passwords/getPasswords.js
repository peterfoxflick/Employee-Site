const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * Generates a list of active passwords
 * @param callback
 */
function getPasswords(callback) {
  pool.query(SQL`SELECT * 
                 FROM passwords 
                 ORDER BY Name`, (err, result) => {
    if(err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

module.exports = getPasswords;



//CREATE TABLE Passwords( PasswordID int, Name varchar(128), Description varchar(500), Img varchar(255), Pass varchar(128), Url varchar(255) );
