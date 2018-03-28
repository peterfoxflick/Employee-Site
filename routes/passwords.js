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
        passwords: result
      });
    }
  });
});


let uploadPassPic = require('../modules/passwords/multerHandlersPassPic');

router.post('/add', uploadPassPic.single('picture'), (req, res) => {


// let updatePic = require('../modules/passwords/changePic');
//   updatePic(sess.user.Id, req.file.filename, (err)=>{
//     if(err) {
//       console.log(err);
//       res.status(500).json({
//         message: "Could not update picture. Please refresh and try again"
//       });
//     } else {
//       console.log('no error');

//       sess.user.Picture = `/images/employeePics/${req.file.filename}`;
//       res.render('user/userInfo', {
//         user : sess.user
//       })
//     }
  console.log(req);

  let newPass = {
    name: req.sanitize(req.body.name),
    description: req.sanitize(req.body.description),
    img: `/images/passwords/${req.file.filename}`,
    pass: req.sanitize(req.body.pass),
    url: req.sanitize(req.body.url),
  };

  //var string = "foo",
//     substring = "oo";
// string.indexOf(substring) !== -1;
  //check the url link

  
  // if (newPass.url.toLowerCase().indexOf("www") == -1) 
  // {
  //   newPass.url = "www." + newPass.url;
  // }

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



// router.post('/uploadPicture', upload.single('newPic'),(req, res, next)=> {
//   let sess = req.session;
//   let removePic = require('../modules/user/removeProfilePic');
//   removePic(sess.user.Picture);
//   let updatePic = require('../modules/user/updateProfilePic');
//   updatePic(sess.user.Id, req.file.filename, (err)=>{
//     if(err) {
//       console.log(err);
//       res.status(500).json({
//         message: "Could not update picture. Please refresh and try again"
//       });
//     } else {
//       console.log('no error');

//       sess.user.Picture = `/images/employeePics/${req.file.filename}`;
//       res.render('user/userInfo', {
//         user : sess.user
//       })
//     }
//   });
// });

module.exports = router;