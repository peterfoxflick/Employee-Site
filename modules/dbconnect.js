/**
 * Created by Mando0975 on 7/3/2017.
 */

// Creates and exports a connection pool

let mysql = require('mysql');
let connString = require('./connectionString');

module.exports = mysql.createPool(connString);


