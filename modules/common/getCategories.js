const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * Queries the db for a list of all application categories
 * @param callback
 */
function getCategories(callback) {
  pool.query(SQL`SELECT CatId, Category FROM categories WHERE 1`, (err, result) => {
    if(err) {
      callback(err)
    } else {
      callback(null, result);
    }
  });
}

module.exports = getCategories;