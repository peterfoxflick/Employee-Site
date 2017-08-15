const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function delApp(appId, callback) {
  pool.query(SQL`DELETE FROM applications WHERE AppId = ${appId};`, (err, res)=>{
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

module.exports = delApp;