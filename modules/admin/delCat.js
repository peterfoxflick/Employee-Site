const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

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