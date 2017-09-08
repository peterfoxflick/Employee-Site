const pool = require('../dbconnect');
const SQL = require('sql-template-strings');
const bcrypt = require('bcrypt-nodejs');

/**
 * module to change the user password
 * First we grab the existing password listed and use a hash compare to verify they entered the correct
 * password. We then call a second function to hash and update the user password.
 *
 * @param userInfo - contains the user id, password, new password, and confirmation password.
 * @param callback
 */
module.exports = function (userInfo, callback) {
  // First grab the current password from the database.
  pool.query(SQL`SELECT Password FROM employee_info WHERE Id = ${ userInfo.userId }`, (err, res) => {
    if(err) {
      callback(err);
    } else {
      res = res [0];
      // converts php hash to bcrypt nodejs hash as needed.
      res.Password = res.Password.replace(/^\$2y(.+)$/i, '\$2a$1');
      if(bcrypt.compareSync(userInfo.pwd, res.Password) && userInfo.newPwd == userInfo.confirmPwd) {
        // call the updatePwd function
        updatePwd(userInfo.newPwd, userInfo.userId, callback);
      } else if(userInfo.newPwd != userInfo.confirmPwd) {
        callback(new Error("Provided passwords don't match"));
      } else {
        callback(new Error("Your password is incorrect"));
      }
    }
  });
};

/**
 * Hashes and inserts the new password into the database
 * @param newPwd
 * @param id
 * @param callback
 */
function updatePwd(newPwd, id,  callback) {

  bcrypt.hash(newPwd, null, null, (err, hash) => {
    if(err) {
      console.log(err);
      callback(err);
    } else {
      pool.query(SQL`UPDATE employee_info SET PASSWORD = ${ hash }, Last_Modified = current_timestamp WHERE Id = ${ id };`, (error, res) => {
        if(error) {
          callback(error);
        } else {
          callback(null);
        }
      });
    }
  });
}
