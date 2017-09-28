const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * Generates a list of active employees
 * @param callback
 */
function getEmpList(callback) {
  pool.query(SQL`SELECT employee_info.Full_Name, employee_info.Phone, employee_info.Assignment, employee_info.Email, employee_info.Picture, teams.Team 
                 FROM employee_info 
                 INNER JOIN teams ON teams.TeamId = employee_info.TeamId 
                 WHERE employee_info.Active = 1 ORDER BY First_Name`, (err, result) => {
    if(err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

module.exports = getEmpList;