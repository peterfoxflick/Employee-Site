const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * queries the database for a list of applications within a certain category
 * @param cat - the desired CatId
 * @param callback - callback function
 */

function getApplications(cat, callback) {
  pool.query(SQL`SELECT AppId, Application FROM applications WHERE CatId = ${ cat }`, (err, result) => {
    if(err) {
      callback(err)
    } else {
      callback(null, result);
    }
  });
}

module.exports = getApplications;