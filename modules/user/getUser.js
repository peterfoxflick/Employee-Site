const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * used to grabe a specific user's info
 * @param id
 * @param callback
 */
function getUser(id, callback) {
  pool.query(SQL`SELECT e.*,t.Team FROM employee_info AS e INNER JOIN teams AS t ON t.TeamId = e.TeamId WHERE e.Id = ${ id };`, (err, res) => {
    if(err) {
      callback(err);
    } else {
      delete res.Password;
      callback(null, res);
    }
  });
}

module.exports = getUser;