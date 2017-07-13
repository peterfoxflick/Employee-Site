/**
 * This is the controller for the homepage, as well as all of the static html pages
 * included on the original github site.
 * Author: bryan muller
 * Date Created: 7-6-17
 */

let express = require('express');
let router = express.Router();
let sess;

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

// GET issue routing page
router.get('/issuerouting', (req, res) => {
  res.render('staticPages/issuerouting');
});

// GET announce page
router.get('/announce', (req, res) => {
  res.render('staticPages/announce');
});

// GET starting weekly log
router.get('/startlog', (req, res) => {
  res.render('staticPages/startlog');
});

// GET end of week log
router.get('/endlog', (req, res) => {
  res.render('staticPages/endlog');
});

// GET kudos page
router.get('/kudos', (req, res) => {
  res.render('staticPages/kudos')
});

// GET tutorial request form
router.get('/tutorialrequest', (req, res) => {
  res.render('staticPages/tutorialrequest');
});

//GET login page
router.get('/login', (req, res) => {
  res.render('login');
});

// POST login details
router.post('/login', (req, res) => {
  //grab session infor
  sess = req.session;
  // gather posted data
  let loginInfo = {
    username : req.sanitize(req.body.username),
    password : req.sanitize(req.body.password)
  };
  // import the login module
  let userLogin = require('../modules/login/userLogin');
  // submit the login info. If login successful, then set the session var
  userLogin(loginInfo, (err, result)=>{
    if(err) console.log(err);
    sess.user = result[0];
    console.log(sess.user.Full_Name);
    res.end();
  });
});

module.exports = router;
