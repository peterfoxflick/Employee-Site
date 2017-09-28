let express = require('express');
let router = express.Router();
let upload = require('../modules/user/multerHandler');

router.get('/av-tutorials',(req, res)=> {
  let sess = req.session;
  res.render('avPages/av-tutorials', {
    user: sess.user
  })
});


module.exports = router;