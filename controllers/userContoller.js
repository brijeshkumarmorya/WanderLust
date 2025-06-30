const User = require("../models/user");

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup");
};

module.exports.userSignUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", `Welcome ${username}`);
            res.redirect("/listings");
        })

    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}

module.exports.userLoginForm = (req, res) => {
    res.render("users/login");
}

module.exports.flashLoggedIn = (req, res) => {
    req.flash("success", `Welcome back, ${req.user.username}!`);
    res.redirect(res.locals.redirectUrl || "/listings");
}

module.exports.loggedOut = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "logOut successfully");
        res.redirect("/listings");
    })
}