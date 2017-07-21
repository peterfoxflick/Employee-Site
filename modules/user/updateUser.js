/**
 * Created by Bryan Muller
 */

const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * updates user information in the database.
 * @param userInfo
 *  - and object containing:
 *  fname: First Name
 *  lname: Last Name
 *  username: Username
 *  phone: phone #
 *  email: email
 * @param callback - callback function
 */
function updateUser(userInfo, callback) {
  pool.query(SQL`UPDATE employee_info 
                  SET First_Name = ${ userInfo.fname }, 
                      Last_Name = ${ userInfo.lname }, 
                      Full_Name = ${userInfo.fname + ' ' + userInfo.lname }, 
                      Phone = ${userInfo.phone}, 
                      Email = ${userInfo.email}, 
                      Username = ${userInfo.username} , 
                      Last_Modified = current_timestamp 
                  WHERE Id = ${ userInfo.id } ;`,
      (err, res) => {
      if(err) {
        callback(err);
      } else if (res.changedRows) {
        callback(null, 1);
      } else {
        callback(new Error("ERROR: Problem updating user"));
      }
  });
}

module.exports = updateUser;