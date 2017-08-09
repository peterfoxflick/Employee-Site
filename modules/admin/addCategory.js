const pool = require('../dbconnect');
const SQL = require('sql-template-strings');


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