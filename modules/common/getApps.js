const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * queries the database for a list of all applications
 * @param callback - callback function
 */

function getApplications(callback) {
  pool.query(SQL`SELECT AppId, Application FROM applications;`, (err, result) => {
    if(err) {
      callback(err)
    } else {
      callback(null, result);
    }
  });
}

module.exports = getApplications;