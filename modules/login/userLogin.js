/**
 * Created by Mando0975 on 7/13/2017.
 */
// console.log('made it to userLogin');
const pool = require('../dbconnect');
const SQL = require('sql-template-strings');
const bcrypt = require('bcrypt-nodejs');

/**
 * A function that logs that checks against the db
 * and returns the user info for a session variable.
 * @param userLogin
 * @param callback
 */
function userLogin(userLogin, callback) {

  pool.query(SQL`SELECT e.*,t.Team FROM employee_info AS e INNER JOIN teams AS t ON t.TeamId = e.TeamId WHERE e.Username = ${ userLogin.username };`, (err, result)=>{
    if(err) {
      console.log(err);
      callback(err);
    } else if(result.length) {
      result = result[0];
      result.Password = result.Password.replace(/^\$2y(.+)$/i, '\$2a$1');
      if(bcrypt.compareSync(userLogin.password, result.Password) && result.Active) {
        delete result.Password;
        callback(null, result);
      } else {
        callback(new Error('ERROR: Incorrect Password Provided'));
      }
    } else {
      callback(new Error('ERROR: Username not found'))
    }
  });

}



module.exports = userLogin;