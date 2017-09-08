/**
 * Validates that the user has admin status before viewing page
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */

function adminValidation(req, res, next) {
  let sess = req.session;
  // if they are an admin, direct them to the next middleware function
  if(sess.user.Admin === 1) {
    return next();
  } else {
    // otherwise set err status and return error page
    let err = new Error('Forbidden: You must be an admin to access this page');
    err.status = 403;
    return next(err);
  }
}

module.exports = adminValidation;