
/**
 * Created by Mando0975 on 7/6/2017.
 *
 * This is the controller for the employee tools pages.
 * These include:
 * Employee List (A dynamic table listing all active employees
 * Gurus Listing (A dynamic table that lists all the gurus
 * Team Viewer Beta (A list of each team and its members)
 */


let express = require('express');
let router = express.Router();
let getCategories = require('../modules/common/getCategories');
let getEmps = require('../modules/employees/getEmpList');

// invalid request
router.get('/', (req, res)=> {
  res.send("Please provide a proper destination URL");
  res.end();
});

// Returns a rendered page of all the active employees
router.get('/empList', (req, res) => {
  let sess = req.session;
  getEmps((err, result) => {
    if(err) {
      console.log(err);
      res.send("Whoops! There was a problem processing your request. Please refresh" +
          "and try again");
    } else {
      res.render('employee/empList', {
        user: sess.user,
        emps: result
      });
    }
  });
});

// Returns a rendered page of the guru ratings
router.get('/gurus', (req, res) => {
  let sess = req.session;
  getCategories((err, result) => {
    if(err) {
      res.send("Whoops! There was a problem processing your request. Please refresh and try again");
    } else {
      res.render('employee/gurus', {
        user: sess.user,
        cats: result
      });
    }
  });
});

router.get('/editRatings', (req, res, next) => {
  let sess = req.session;
  getCategories((err, result) => {
    if(err) {
      next(err)
    } else {
      res.render('employee/editRatings', {
        user: sess.user,
        cats: result
      });
    }
  });
});

module.exports = router;