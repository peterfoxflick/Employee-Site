const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * queries the db for a list of ratings for a specified application
 * @param app - the AppId of the requested app ratings
 * @param callback - callback function
 */
function getRatings(app, callback) {
  pool.query(SQL`SELECT gururatings.GuruId, applications.Application, gururatings.Certified, employee_info.Full_Name, gururatings.Rating 
                 FROM gururatings
                 INNER JOIN applications ON applications.AppId = gururatings.AppId
                 INNER JOIN employee_info ON employee_info.Id = gururatings.EmpId
                 WHERE gururatings.AppId = ${ app }
                 AND employee_info.Active = 1
                 ORDER BY gururatings.Rating DESC;`,
    (err, result)=>{
      if(err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, result);
      }
  });

}

module.exports = getRatings;