const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * Adds an entry into
 * @param appId
 * @param userId
 * @param callback
 */

function addAppRatings(appId, userId, callback) {
  pool.query(SQL`INSERT INTO gururatings (EmpId, AppId) VALUES (${userId}, ${appId});`, (err, result) => {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

module.exports = addAppRatings;