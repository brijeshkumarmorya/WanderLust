const User = require("../models/user");
const sendOTP = require("../utils/sendOTP");

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup");
};

module.exports.userSignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Save user data temporarily in session
        req.session.tempUser = { username, email, password };
        req.session.otp = otp;
        req.session.otpExpires = Date.now() + 5 * 60 * 1000; // 5 mins

        // Send OTP
        await sendOTP(email, otp);

        req.flash("info", "OTP sent to your email.");
        res.redirect("/verify-otp");

    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
};

module.exports.renderOTPForm = (req, res) => {
    res.render("users/verifyOtp"); 
};

module.exports.verifyOTP = async (req, res) => {
    const { otp } = req.body;
    const { tempUser, otp: sessionOtp, otpExpires } = req.session;

    if (!tempUser) {
        req.flash("error", "Session expired. Please sign up again.");
        return res.redirect("/signup");
    }

    if (Date.now() > otpExpires) {
        req.flash("error", "OTP expired. Please sign up again.");
        return res.redirect("/signup");
    }

    if (parseInt(otp) !== sessionOtp) {
        req.flash("error", "Incorrect OTP. Try again.");
        return res.redirect("/verify-otp");
    }

    // OTP verified → Create user
    const { username, email, password } = tempUser;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    // Login and clean session
    req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.session.tempUser = null;
        req.session.otp = null;
        req.session.otpExpires = null;

        req.flash("success", `Welcome ${username}`);
        res.redirect("/listings");
    });
};


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