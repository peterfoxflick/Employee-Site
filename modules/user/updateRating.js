const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function updateRating(ratingInfo, callback){
  pool.query(SQL`UPDATE gururatings SET Rating = ${ parseInt(ratingInfo.rating) }, Certified = ${ parseInt(ratingInfo.cert) }, Last_Modified = current_timestamp WHERE GuruId = ${ parseInt(ratingInfo.guruId) }`, (err, res)=> {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

module.exports = updateRating;