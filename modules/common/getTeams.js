const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * queries the db for a list of ratings for a specified application
 * @param app - the AppId of the requested app ratings
 * @param callback - callback function
 */
function getTeams(callback) {
  pool.query(SQL`SELECT * FROM teams;`,
      (err, result)=>{
        if(err) {
          console.log(err);
          callback(err);
        } else {
          callback(null, result);
        }
      });

}

module.exports = getTeams;