const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * Deletes user from the database. Will also delete all ratings associated with that id
 * @param id - user id to be removed
 * @param callback
 */

function removeUser(id, callback) {
  pool.query(SQL`DELETE FROM employee_info WHERE Id = ${ id }`, (err, res) => {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

module.exports = removeUser;