module.exports = (req, res, next) => {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }
  return res.status(403).json({ msg: "no access" });
  // If the user isn't' logged in, redirect them to the login page
  // return res.redirect("/");
};
