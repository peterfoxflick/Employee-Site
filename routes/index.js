/**
 * This is the controller for the homepage, as well as all of the static html pages
 * included on the original gihub site.
 * Author: bryan muller
 * Date Created: 7-6-17
 */

let express = require('express');
let router = express.Router();
let sess;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// GET issue routing page
router.get('/issuerouting', (req, res, next) => {
  res.render('staticPages/issuerouting');
});

// GET announce page
router.get('/announce', (req, res, next) => {
  res.render('staticPages/announce');
});

// GET starting weekly log
router.get('/startlog', (req, res, next) => {
  res.render('staticPages/startlog');
});

// GET end of week log
router.get('/endlog', (req, res, next) => {
  res.render('staticPages/endlog');
});

// GET kudos page
router.get('/kudos', (req, res, next) => {
  res.render('staticPages/kudos')
});

// GET tutorial request form
router.get('/tutorialrequest', (req, res, next) => {
  res.render('staticPages/tutorialrequest');
});

//GET login page
router.get('/login', (req, res, next) => {
  res.render('login');
});

// POST login details
router.post('/login', (req, res, next) => {
  res.send(req.body);
});

module.exports = router;
