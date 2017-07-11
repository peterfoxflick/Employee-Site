/**
 * Created by Mando0975 on 7/3/2017.
 */
var mysql = require('mysql');
var connString = require('./connectionString');

module.exports = function () {
    var con = mysql.createConnection(connString);
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
}


