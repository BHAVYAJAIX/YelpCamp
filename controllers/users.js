const user = require("../models/user");
const passport = require("passport");
module.exports.renderRegisterForm = (req, res) => {
  res.render("users/register");
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.logoutFunction = (req, res) => {
  req.logout();
  console.log("hjbjh");
  req.flash("success", "Goodbye!");
  res.redirect("/login");
};

module.exports.registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const newuser = new user({ email, username });
    const registeredUser = await user.register(newuser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to YelpCamp");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    res.redirect("/register");
  }
};

module.exports.successfulLogin = (req, res) => {
  req.flash("success", "Successfully logged in!");
  res.redirect("/campgrounds");
};
