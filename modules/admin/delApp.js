const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * Deletes and application from the db
 *
 * @param appId - the id to be deleted
 * @param callback
 */
function delApp(appId, callback) {
  pool.query(SQL`DELETE FROM applications WHERE AppId = ${appId};`, (err, res)=>{
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

module.exports = delApp;