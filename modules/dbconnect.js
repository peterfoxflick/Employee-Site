/**
 * Created by Mando0975 on 7/3/2017.
 */
let path = require('fs');
// Creates and exports a connection pool
path.exists('./connectionString', (exists)=> {
  if(exists) {
    let mysql = require('mysql');
    let connString = require('./connectionString');
    module.exports = mysql.createPool(connString);
  }
});



