/**
 * Created by Mando0975 on 7/11/2017.
 *
 * Middleware for verifying the user is logged in
 */

function loginValidation(req, res, next) {
  let sess = req.session;
  if(sess.user) {
    return next();
  }
  else {
    // if no user session, send a 403 error
    let err = new Error('Forbidden: You must be logged in to access this page');
    err.status = 403;
    next(err);
  }
}

module.exports = loginValidation;