// =========================
// ENVIRONMENT CONFIGURATION
// =========================
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// =========================
// IMPORTS & DEPENDENCIES
// =========================
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// =========================
// LOCAL MODULES
// =========================
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const User = require("./models/user.js");

// =========================
// APP INITIALIZATION
// =========================
const app = express();

// =========================
// DATABASE CONNECTION
// =========================
const dbUrl = process.env.ATLAS_DB_URL;

async function connectDB() {
    try {
        await mongoose.connect(dbUrl, {
            tls: true,
        });
        console.log("✅ MongoDB connection successful");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1); // Exit the app if DB connection fails
    }
}
connectDB();

// =========================
// SESSION CONFIGURATION
// =========================
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SESSION_SECRET || "thisshouldbeabettersecret!"
    }
});

// =========================
// VIEW ENGINE SETUP (EJS)
// =========================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// =========================
// MIDDLEWARES
// =========================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionOptions));
app.use(flash());

// =========================
// PASSPORT CONFIGURATION
// =========================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =========================
// FLASH & CURRENT USER IN VIEWS
// =========================
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

// =========================
// ROUTES
// =========================
app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// =========================
// 404 NOT FOUND HANDLER
// =========================
app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// =========================
// GLOBAL ERROR HANDLER
// =========================
app.use((err, req, res, next) => {
    if (err.name === "CastError") {
        err.status = 400;
        err.message = "Invalid ID format";
    }

    const { status = 500, message = "Something went wrong" } = err;

    // Log error details in development mode
    if (process.env.NODE_ENV !== "production") {
        console.error("🚨 Error:", err);
    }

    res.status(status).render("error", { err });
});

// =========================
// SERVER START
// =========================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
