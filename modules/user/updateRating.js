const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * Updates a user's rating
 *
 * @param ratingInfo - an object containing:
 *                      - rating: new rating to be inserted.
 *                      - cert: a flag of certification status
 *                      - guruId: the unique rating Id
 * @param callback
 */
function updateRating(ratingInfo, callback){
  pool.query(SQL`UPDATE gururatings SET Rating = ${ parseInt(ratingInfo.rating) }, 
                                        Certified = ${ parseInt(ratingInfo.cert) },
                                        Last_Modified = current_timestamp 
                                        WHERE GuruId = ${ parseInt(ratingInfo.guruId) }`, (err, res)=> {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

module.exports = updateRating;