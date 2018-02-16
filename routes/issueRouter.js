let express = require('express');
let router = express.Router();


// Returns a rendered page of all the issueRouter process
router.get('/issueRouter', (req, res) => {
    let getData = require('../modules/issueRouter/getData');
    let sess = req.session;
    getData("Problem",(err, result) => {
        if(err) {
            console.log(err);
            res.send("Whoops! There was a problem processing your request. Please refresh" +
                "and try again");
        } else {
            res.render('issueRouter/router', {
                user: sess.user,
                categories: result
            });
        }
    });
});