/**
 * Created by Mando0975 on 7/6/2017.
 *
 * This router handles all requests regarding personal user tools
 * This includes updating user information and passwords
 *
 */

let express = require('express');
let router = express.Router();
let upload = require('../modules/user/multerHandler');


/* GET userInfo page */
router.get('/userInfo', (req, res) => {
  let sess = req.session;
  res.render('user/userInfo', {
    user: sess.user
  });
});

/**
 * Updates the user's name, username, email and phone
 * based on data submitted through a form.
 */
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
        // ensure that the username is unique
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
          // update the session variable
          sess.user = user[0];
          res.json({
            message: 'User updated'
          });
        }
      });
    }
  });
});


/**
 * Updates user password
 */
router.post('/updatePwd', (req, res) => {
  let sess = req.session;
  let changePwd = require('../modules/user/changePwd');
  let userInfo = {
    userId: sess.user.Id,
    pwd: req.sanitize(req.body.pwd),
    newPwd: req.sanitize(req.body.newPwd),
    confirmPwd: req.sanitize(req.body.confirmPwd),
  };
  changePwd(userInfo, (err) => {
    if(err) {
      res.status(500).json({
        message: err.message
      })
    } else {
      res.json({
        message: 'Password updated'
      });
    }
  });
});

router.get('/getMyRatings', (req, res)=> {
  let cat = req.sanitize(req.query.cat);
  let getMyRatings = require('../modules/user/getMyRatings');
  getMyRatings(req.session.user.Id, cat, (err, ratings)=> {
    if(err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      res.json({
        ratings: ratings
      })
    }
  })
});


router.post('/updateMyRatings', (req, res)=> {
  let ratings = JSON.parse(req.body.ratings);
  let updateRating = require('../modules/user/updateRating');
  console.log(ratings);
  let error = false;
  for(let x in ratings.id) {
    // take the i off the end of the property name
    let guruId = x.slice(0,-1);
    let rating = ratings.id[x];
    let cert = ratings.cert[guruId + 'c'];
    let ratingOb = {
      guruId : guruId,
      rating: rating,
      cert: cert
    };
    updateRating(ratingOb, (err)=> {
      if (err) {
        console.log(err);
        error = true;
      }
    })
  }
  if(!error){
    res.json({
      message: 'Ratings Updated'
    })
  } else {
    res.status(500).json({
      message: "Could not update Guru rating. Please try again"
    });
  }
});

router.post('/uploadPicture', upload.single('newPic'),(req, res, next)=> {
  let sess = req.session;
  let removePic = require('../modules/user/removeProfilePic');
  removePic(sess.user.Picture);
  let updatePic = require('../modules/user/updateProfilePic');
  updatePic(sess.user.Id, req.file.filename, (err)=>{
    if(err) {
      console.log(err);
      res.status(500).json({
        message: "Could not update picture. Please refresh and try again"
      });
    } else {
      console.log('no error');

      sess.user.Picture = `/images/employeePics/${req.file.filename}`;
      res.render('user/userInfo', {
        user : sess.user
      })
    }
  });
});

module.exports = router;