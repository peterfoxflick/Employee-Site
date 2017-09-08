const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * deletes a category from the db. WARNING! This will also delete all applications
 * listed in this category
 *
 * @param catId
 * @param callback
 */

function delCat(catId, callback) {
  pool.query(SQL`DELETE FROM categories WHERE CatId = ${catId};`, (err, res)=>{
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

module.exports = delCat;