const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});

router.post(
  "/users/signin",
  passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true,
  })
);

router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/users/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  console.log(req.body);

  if (name.length <= 0) {
    errors.push({ text: "Please insert your name mother fucker" });
  }
  if (email.length <= 0) {
    errors.push({ text: "Please insert an valid email" });
  }
  if (password != confirm_password) {
    errors.push({ text: "Passwords given don't match" });
  }
  if (password.length < 4) {
    errors.push({ text: "Password should be at least 4 characters" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    const userEmail = await User.findOne({ email: email });
    /*const userName = await User.findOne({name: name})
        if (userName) {
            errors.push({text: 'The username is alredy in use'})
            res.redirect('/users/signin')
        }*/
    if ((userEmail = true)) {
      req.flash("error_msg", "This email is alredy in use");
      res.redirect("/users/signup");
    }
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash("success_msg", "You're been registered");
    res.redirect("/users/signin");
  }
});

router.get("/user/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
