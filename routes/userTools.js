/**
 * Created by Mando0975 on 7/6/2017.
 *
 * This router handles all requests regarding personal user tools
 *
 *
 */

let express = require('express');
let router = express.Router();

router.get('/userInfo', (req, res) => {
  let sess = req.session;
  res.render('user/userInfo', {
    user: sess.user
  });
});

module.exports = router;