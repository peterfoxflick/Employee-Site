function adminValidation(req, res, next) {
  let sess = req.session;
  if(sess.user.Admin === 1) {
    return next();
  }
  res.redirect('/');
}

module.exports = adminValidation;