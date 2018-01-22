/**
 * Created by Mando0975 on 7/6/2017.
 * This router handles all admin activity. This includes managing employees,
 * the gurus system, teams, and other functionality.
 *
 */

let express = require('express');
let router = express.Router();

router.get('/manageEmps', (req, res, next) => {
  let sess = req.session;
  let getEmpList = require('../modules/admin/getEmpList');
  let getTeams = require('../modules/common/getTeams');
  getEmpList((err, result) => {
    if(err) {
      console.log(err);
      let error = new Error('Internal Server Error');
      err.status = 505;
      next(error);
    }
    getTeams((err1, teams) => {
      if(err1) {
          console.log(err1);
         let error = new Error('Internal Server Error');
         err.status = 505;
         next(error);
      }
      res.render('admin/manageEmps', {
        user: sess.user,
        emps: result,
        teams: teams
      });
    });
  });
});


router.post('/updateUser', (req, res) => {
  let userInfo = {
    id: req.sanitize(req.body.id),
    email: req.sanitize(req.body.email),
    team: req.sanitize(req.body.team),
    assignment: req.sanitize(req.body.assignment),
    active: req.sanitize(req.body.active),
    admin: req.sanitize(req.body.admin)
  };
  let updateUser = require('../modules/admin/updateUser');
  updateUser(userInfo, (err)=> {
    if(err) {
      res.json({
        message: 'Please check your inputs and try again...'
      });
    } else {
      res.json({
        message: 'User was updated'
      });
    }
  });
});


router.post('/removeUser', (req, res) => {
  let id = req.sanitize(req.body.id);
  let removeUser = require('../modules/admin/removeUser');
  removeUser(id, (err)=> {
    if(err) {
      res.status(500).json({
        message: 'Something went wrong. Please try again...'
      });
    } else {
      res.json({
        message: 'User was removed'
      })
    }
  })
});


router.post('/addUser', (req, res) => {
  let userInfo = {
    fname: req.sanitize(req.body.fname),
    lname: req.sanitize(req.body.lname),
    email: req.sanitize(req.body.email),
    assignment: req.sanitize(req.body.assign),
    username: req.sanitize(req.body.username),
    password: req.sanitize(req.body.pwd)
  };

  let addUser = require('../modules/admin/addUser');
  addUser(userInfo, (err, insertId)=> {
    if(err) {
      res.status(500).json({
        message: 'There was an error adding user. Please check your inputs and try again'
      })
    } else {
      res.json({
        message: 'User added succesfully'
      });
      addUserToRatings(insertId);
    }
  })

});


router.get('/editGurus', (req, res) => {
  let getCategories = require('../modules/common/getCategories');
  getCategories((err, cats)=> {
    res.render('admin/editGurus', {
      user: req.session.user,
      cats: cats
    })
  });
});

router.post('/addCategory', (req, res)=> {
  let cat = req.sanitize(req.body.cat);
  let addCategory = require('../modules/admin/addCategory');
  addCategory(cat, (err, catId)=> {
    if(err) {
      res.status(500).json({
        message: "There was a problem with the server"
      });
    } else {
      res.json({
        message: 'Category added',
        catId: catId,
        cat: cat
      });
    }
  });

});

router.post('/addApplication', (req, res)=> {
  let addApplication = require('../modules/admin/addApplication');
  let app = req.sanitize(req.body.app);
  let cat = req.sanitize(req.body.cat);
  addApplication(cat, app, (err, appId)=> {
    if(err) {
      res.status(500).json({
        message: "There was a problem with the server"
      })
    } else {
      res.json({
        message: "Application added",
        app: app,
        appId: appId,
        cat: cat
      });
      addApplicationToRatings(appId);
    }
  })
});

router.post('/updateCat', (req, res)=> {
  let updateCat = require('../modules/admin/updateCat');
  let catInfo = {
    cat: req.sanitize(req.body.cat),
    catId: req.sanitize(req.body.catId)
  };
  updateCat(catInfo, (err)=> {
    if(err) {
      res.status(500).json({
        message: "There was a problem with the server"
      })
    } else {
      res.json({
        message: "Category updated"
      })
    }
  })
});

router.post('/updateApp', (req, res)=>{
  let updateApp = require('../modules/admin/updateApp');
  let appInfo = {
    app: req.sanitize(req.body.app),
    appId: req.sanitize(req.body.appId),
    catId: req.sanitize(req.body.catId)
  };
  updateApp(appInfo, (err) => {
    if(err) {
      res.status(500).json({
        message: "There was a problem with the server"
      })
    } else {
      res.json({
        message: "Application updated"
      })
    }
  })
});

router.post('/delCat', (req, res)=> {
  let delCat = require('../modules/admin/delCat');
  let cat = req.sanitize(req.body.catId);
  delCat(cat, (err) => {
    if(err) {
      res.status(500).json({
        message: "Problem deleting the category"
      });
    } else {
      res.json({
        message: "Category deleted"
      });
    }
  });
});

router.post('/delApp', (req, res)=> {
  let delApp = require('../modules/admin/delApp');
  let app = req.sanitize(req.body.appId);
  delApp(app, (err)=> {
    if(err) {
      res.status(500).json({
        message: "Problem deleting the application"
      });
    } else {
      res.json({
        message: "Application deleted"
      });
    }
  });
});


router.post('/updateAll', (req, res) => {
  let users = JSON.parse(req.body.users);
  let updateUser = require('../modules/admin/updateUser');
  let errthrown = false;
  users.map((user) => {
    user = sanitizeUser(user, req.sanitize);
    updateUser(user, (err)=> {
      if(err) {
        console.log(err);
        errthrown = true;
      }
    });

  });
  if(errthrown) {
    res.json({
      message: "ERROR: Could not update"
    })
  }
  res.json({
    message:"Updated Successfully"
  })
});


function sanitizeUser(user, sanitize) {
  return {
    id: sanitize(user.id),
    email: sanitize(user.email),
    assignment: sanitize(user.assignment),
    // sanitize was returning undefined when sanitizing zero value for admin and active
    // so... this is what I came up with... :)
    active: parseInt(sanitize(user.active.toString())),
    team: sanitize(user.team),
    admin: parseInt(sanitize(user.admin.toString()))
  }
}

/**
 * Gets a list of all applications, and adds a row for each app in the gururatings for the inserted user
 * @param insertId - The id of the inserted user
 */
function addUserToRatings(insertId) {
  let getApps = require('../modules/common/getApps');
  getApps((err1, apps)=> {
    if(err1) {
      console.log(err1)
    } else {
      let addRatings = require('../modules/admin/addRatings');
      for(let i = 0; i < apps.length; i++) {
        addRatings(apps[i].AppId, insertId,  (err2) => {
          if(err2) {
            console.log(err2);
          }
        })
      }
    }
  });
}


function addApplicationToRatings(insertId) {
  let getUsers = require('../modules/admin/getEmpList');
  getUsers((err, emps)=> {
    if(err) {
      console.log(err);
    } else {
      let addRatings = require('../modules/admin/addRatings');
      for(let i = 0; i < emps.length; i++) {
        addRatings(insertId, emps[i].Id, (err1)=> {
          if(err1) {
            console.log(err1);
          }
        });
      }
    }
  });
}


module.exports = router;