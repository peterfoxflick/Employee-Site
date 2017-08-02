const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

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