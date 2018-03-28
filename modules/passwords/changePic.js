const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function updatePic(passID, filename, callback) {
  let path = `/images/passwords/${filename}`;
  console.log(SQL`UPDATE employee_info SET Picture = ${path}, Last_Modified = current_timestamp WHERE Id = ${passID};`);
  pool.query(SQL`UPDATE employee_info SET Picture = ${path}, Last_Modified = current_timestamp WHERE Id = ${passID};`,(err, res)=> {
    if(err) {
      callback(err);
    }
    else {
      callback(null);
    }
  });
}

module.exports = updatePic;