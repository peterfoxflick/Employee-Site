const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * Used to update the name and/or category of an application
 * @param appInfo - object that contains
 *                  - app: the app name
 *                  - catId: category id
 *                  - appId: the application id
 * @param callback
 */

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