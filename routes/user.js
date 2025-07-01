const express = require("express");
const Router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const { saveRedirectUrl } = require("../Middleware");
const userContoller = require("../controllers/userContoller");

Router.route("/signup")
    .get(userContoller.renderSignUpForm)
    .post(wrapAsync(userContoller.userSignUp));

Router.get("/verify-otp", userContoller.renderOTPForm);
Router.post("/verify-otp", wrapAsync(userContoller.verifyOTP));

// Show login form
Router.get("/login", userContoller.userLoginForm);

// Handle login
Router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login"
    }),
    userContoller.flashLoggedIn
);

//logout
Router.get("/logout", userContoller.loggedOut);


module.exports = Router;