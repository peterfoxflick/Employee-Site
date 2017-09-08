const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * Adds an entry into the guru ratings table.
 * The guru ratings table is many - to - many, so each user has an entry for every application.
 * This module inserts an entry into the table for an application rating, and ties it to a userId.
 *
 * @param appId - the id of the application this rating will be tied to
 * @param userId - the user id this application rating will be tied to
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