/**
 * Created by Bryan Muller on 7/7/2017
 *
 * This router handles many of the misc api calls
 * that are needed to update the web pages via ajax.
 *
 * See the API documentation for a full listing of available routes.
 *
 * @type {*|createApplication}
 */

let express = require('express');
let router = express.Router();

/**
 * Gets a list of applications within a certain category.
 * Requires a cat parameter in the query string
 * @param cat - the category Id
 */
router.get('/getApps', (req, res) => {
  let cat = req.sanitize(req.query.cat);
  let getCatApps = require('../modules/common/getCatApps');
  getCatApps(cat, (err, result) => {
    if(err) {
      console.log(err);
      res.send("Whoops! There was a problem processing your request. Please refresh" +
          "and try again");
    } else {
      res.json({
        apps: result
      });
    }
  });
});

/**
 * Gets a list of all the application categories
 */
router.get('/getCategories', (req, res) => {
  let getCategories = require('../modules/common/getCategories');
  getCategories((err, result) => {
    if(err) {
      console.log(err);
      res.sendStatus(500);
      res.send("Error Processing request");
    } else {
      res.json({cats: result});
    }
  });
});

/**
 * Gets a list of all the guru ratings for a specific application
 * @param app - the AppId of the desired ratings list
 */
router.get('/getRatings', (req, res)=> {
  let app = req.sanitize(req.query.app);
  let getRatings = require('../modules/common/getRatings');
  getRatings(app, (err, result)=> {
    if(err) {
      console.log(err);
      res.send(err.message);
    } else {
     console.log(result);
     res.json({ratings: result});
    }
  });
});

router.post('/updateUser', (req, res)=>{
  let sess = req.session;
  let userInfo = {
    fname: req.sanitize(req.body.fname),
    lname: req.sanitize(req.body.lname),
    username: req.sanitize(req.body.username),
    email: req.sanitize(req.body.email),
    phone: req.sanitize(req.body.phone),
    id: sess.user.Id
  };

  let updateUser = require('../modules/user/updateUser');
  updateUser(userInfo, (err, result) => {
    if(err) {
      //TODO add more response codes
      switch(err.code) {
        case 'ER_DUP_ENTRY':
          res.status(500).json({
            message: "Username already exists"
          });
          break;
      }
    } else {
      let getUser = require('../modules/user/getUser');
      getUser(sess.user.Id, (err, user) =>{
        if(err) {
          console.log(err);
        } else {
          sess.user = user[0];
          res.json({
            message: 'Success! User updated'
          });
        }
      });
    }
  });
});

module.exports = router;