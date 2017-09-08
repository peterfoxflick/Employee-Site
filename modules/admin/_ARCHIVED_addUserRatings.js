const pool = require('../dbconnect');
const SQL = require('sql-template-strings');


/**
 * ARCHIVED
 * @param userId
 * @param appId
 * @param callback
 */
function addUserRatings(userId, appId, callback) {
  pool.query(SQL`INSERT INTO gururatings (EmpId, AppId) VALUES (${userId}, ${appId});`, (err, result) => {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

module.exports = addUserRatings;