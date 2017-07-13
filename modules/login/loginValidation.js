/**
 * Created by Mando0975 on 7/11/2017.
 */

function loginValidation(req, res, next) {
  let sess = req.session;
  if(sess.user) {
    return next();
  }
  res.redirect('/login');
}

module.exports = loginValidation;