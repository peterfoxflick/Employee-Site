const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function updateUser(userInfo, callback) {
  let string = SQL`UPDATE employee_info
                 SET Email = ${ userInfo.email },
                 TeamId = ${ parseInt(userInfo.team) },
                 Assignment = ${ userInfo.assignment },
                 Active = ${ parseInt(userInfo.active) },
                 Admin = ${ parseInt(userInfo.admin) },
                 Last_Modified = current_timestamp
                 WHERE Id = ${ parseInt(userInfo.id) };`;
  pool.query(string,
      (err, res)=> {
        if(err) {
          callback(err);
        } else {
          callback(null);
        }

  });
}

module.exports = updateUser;