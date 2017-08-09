const pool = require('../dbconnect');
const SQL = require('sql-template-strings');


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