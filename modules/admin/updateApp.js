const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function updateApp(appInfo, callback) {
  pool.query(SQL`UPDATE applications 
                 SET Application = ${ appInfo.app }, CatId = ${ appInfo.catId }, Last_Modified = current_timestamp 
                 WHERE AppId = ${ appInfo.appId };`, (err, res)=> {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

module.exports = updateApp;