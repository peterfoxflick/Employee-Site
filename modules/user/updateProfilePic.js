const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function updatePic(userId, filename, callback) {
  let path = `/images/employeePics/${filename}`;
  console.log(SQL`UPDATE employee_info SET Picture = ${path}, Last_Modified = current_timestamp WHERE Id = ${userId};`);
  pool.query(SQL`UPDATE employee_info SET Picture = ${path}, Last_Modified = current_timestamp WHERE Id = ${userId};`,(err, res)=> {
    if(err) {
      callback(err);
    }
    else {
      callback(null);
    }
  });
}

module.exports = updatePic;