/**
 * Created by PeterFoxFlick on 22/3/2018.
 *
 * This router handles all requests regarding the passwords
 * that are stored on the website. 
 *
 */

let express = require('express');
let router = express.Router();
let getPasswords = require('../modules/passwords/getPasswords');


router.get('/', (req, res) => {
  let sess = req.session;
  getPasswords((err, result) => {
    if(err) {
      console.log(err);
      res.send("Whoops! There was a problem processing your request. Please refresh" +
          "and try again");
    } else {
      res.render('passwords/viewAll', {
        user: sess.user,
        passwords: result,
        editPassID: 0
      });
    }
  });
});


let uploadPassPic = require('../modules/passwords/multerHandlersPassPic');

router.post('/add', uploadPassPic.single('picture'), (req, res) => {

  let newPass = {
    name: req.sanitize(req.body.name),
    description: req.sanitize(req.body.description),
    img: `/images/passwords/${req.file.filename}`,
    pass: req.sanitize(req.body.pass),
    url: req.sanitize(req.body.url),
  };


  if (newPass.url.toLowerCase().indexOf("http") == -1 ) 
  {
    newPass.url = "http://" + newPass.url;
  }

  let addPass = require('../modules/passwords/addPassword');
  addPass(newPass, (err)=> {
    if(err) {
      res.status(500).json({
        message: 'There was an error adding password. Please check your inputs and try again'
      })
    } else {
        res.redirect('/passwords');
    }
  })


});



router.post('/edit', (req, res) => {

  let newPass = {
    passId: req.sanitize(req.body.passIdVal),
    name: req.sanitize(req.body.editName),
    description: req.sanitize(req.body.editDescription),
    //img: `/images/passwords/${req.file.filename}`,
    pass: req.sanitize(req.body.editPass),
    url: req.sanitize(req.body.editUrl),
  };
  // if (newPass.url.toLowerCase().indexOf("http") == -1 ) 
  // {
  //   newPass.url = "http://" + newPass.url;
  // }

  let editPass = require('../modules/passwords/editPass');
  editPass(newPass, (err)=> {
    if(err) {
      res.status(500).json({
        message: 'There was an error adding password. Please check your inputs and try again'
      })
    } else {
        res.redirect('/passwords');
    }
  })


});


module.exports = router;