/**
 * This is the controller for the homepage, as well as all of the static html pages
 * included on the original github site.
 * Author: bryan muller
 * Date Created: 7-6-17
 */

let express = require('express');
let router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  let sess = req.session;
  res.render('index', {
    user: sess.user
  });
});

// GET issue routing page
router.get('/issuerouting', (req, res) => {
  let sess = req.session;
  res.render('staticPages/issuerouting', {
    user: sess.user
  });
});

// GET announce page
router.get('/announce', (req, res) => {
  let sess = req.session;
  res.render('staticPages/announce', {
    user: sess.user
  });
});

// GET starting weekly log
router.get('/startlog', (req, res) => {
  let sess = req.session;
  res.render('staticPages/startlog', {
    user: sess.user
  });
});

// GET end of week log
router.get('/endlog', (req, res) => {
  let sess = req.session;
  res.render('staticPages/endlog', {
    user: sess.user
  });
});

// GET kudos page
router.get('/kudos', (req, res) => {
  let sess = req.session;
  res.render('staticPages/kudos', {
    user: sess.user
  });
});

// GET tutorial request form
router.get('/tutorialrequest', (req, res) => {
  let sess = req.session;
  res.render('staticPages/tutorialrequest', {
    user: sess.user
  }
)
});

// POST login details
router.post('/login', (req, res) => {

  if(req.session.user) {
    res.send("Error: You are already logged in");
    res.end();
  }

  //grab session info
  let sess = req.session;
  // gather posted data
  let loginInfo = {
    username : req.sanitize(req.body.username),
    password : req.sanitize(req.body.password)
  };
  // import the login module
  let userLogin = require('../modules/login/userLogin');
  // submit the login info. If login successful, then set the session var
  userLogin(loginInfo, (err, result)=>{
    if(err) {
        res.json({
          err: 1
        });
    } else {
      // set user session variable
      sess.user = result;
      res.json({
        err: 0
      })
    }
  });
});


//GET logout
router.get('/logout', (req, res) => {
  // destroy session, return login page
  req.session.destroy();
  res.redirect('/');
});

router.get('/issueroutingdev', (req, res) => {
  let sess = req.session;
  res.render('staticPages/issueroutingdev', {
    user: sess.user
  });
});

module.exports = router;
