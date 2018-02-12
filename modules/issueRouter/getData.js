const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * Returns all data in the requested column of the database
 * @param callback
 */
function getCategoryData(category, callback) {
    pool.query(SQL`SELECT ${category} FROM issue_router`, (err, result) => {
        if(err) {
            callback(err);
        } else {
            callback(null, result);
}
});
}

module.exports = getCategoryData;