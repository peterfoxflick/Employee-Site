let express = require('express');
let router = express.Router();

router.get('/getApps', (req, res) => {
  let sess = req.session;
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

module.exports = router;