const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * Gets all of a user's ratings for an application category. Returns an array of Ratings.
 *
 * @param id - userId
 * @param cat - catId
 * @param callback
 */
function getMyRatings(id, cat, callback) {
  pool.query(SQL`SELECT gururatings.GuruId, applications.Application, gururatings.Certified, gururatings.Rating 
                 FROM gururatings
                 INNER JOIN applications ON applications.AppId = gururatings.AppId
                 WHERE gururatings.EmpId = ${ id } AND applications.CatId = ${cat}
                 ORDER BY gururatings.Rating DESC;`, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

module.exports = getMyRatings;