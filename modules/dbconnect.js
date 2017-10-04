/**
 * Created by Mando0975 on 7/3/2017.
 */

// Creates and exports a connection pool

let mysql = require('mysql');

try {
    let connString = require('./connectionString');

    module.exports = mysql.createPool(connString);

} catch (e) {
    console.log('WARNING: Could not connect to database. Certain site functionality will now be broken')
    module.exports = null;
}
