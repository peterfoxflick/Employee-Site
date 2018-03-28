const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

/**
 * Adds a password to the database.
 *
 * @param cat - the category the application will be listed in
 * @param app - name of the application
 * @param callback
 */

function addPass(newPass, callback) {

// let newPass = {
//     name: req.sanitize(req.body.name),
//     description: req.sanitize(req.body.description),
//     //img: req.sanitize(req.body.img),
//     pass: req.sanitize(req.body.pass),
//     url: req.sanitize(req.body.url),
//   };

  pool.query(SQL`INSERT INTO passwords (Name, Description, Pass, Url, Img) 
  				 VALUES (${newPass.name}, ${newPass.description}, ${newPass.pass}, ${newPass.url}, ${newPass.img});`,
      (err, res)=> {
        if(err) {
          callback(err);
        } else {
          callback(null);
        }

  });
}

module.exports = addPass;


