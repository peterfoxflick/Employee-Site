const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * adds a category to the db
 *
 * @param cat - name of the category to be added
 * @param callback
 */

function addCategory(cat, callback) {
  pool.query(SQL`INSERT INTO categories (Category) VALUES (${cat});`,(err, result)=> {
    if(err) {
      callback(err);
    } else {
      callback(null, result.insertId);
    }
  })
}

module.exports = addCategory;