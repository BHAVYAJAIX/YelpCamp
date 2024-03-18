const express = require("express");
const user = require("../models/user");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const users = require("../controllers/users");

router.get("/register", users.renderRegisterForm);
router.get("/login", users.renderLoginForm);
router.get("/logout", users.logoutFunction);

router.post("/register", catchAsync(users.registerUser));

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  users.successfulLogin
);

module.exports = router;
