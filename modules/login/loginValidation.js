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
  res.redirect('/');
}

module.exports = loginValidation;