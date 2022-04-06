const withAuth = (req, res, next) => {
  // go to login if user is not logged in
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
