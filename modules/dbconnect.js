/**
 * Created by Mando0975 on 7/3/2017.
 */
// console.log('made it to dbconnect');
let mysql = require('mysql');
let connString = require('./connectionString');
// console.log('made it to export');
module.exports = mysql.createPool(connString);


