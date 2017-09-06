const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * Adds an application to the applications table.
 *
 * @param cat - the category the application will be listed in
 * @param app - name of the application
 * @param callback
 */

function addApplication(cat, app, callback) {
  pool.query(SQL`INSERT INTO applications (Application, CatId) VALUES (${app}, ${cat});`,(err, result)=> {
    if(err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  })
}

module.exports = addApplication;