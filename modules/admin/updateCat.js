const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function updateCat(catInfo, callback) {
  pool.query(SQL`UPDATE categories SET Category = ${ catInfo.cat }, Last_Modified = current_timestamp WHERE CatId = ${ catInfo.catId }`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

module.exports = updateCat;