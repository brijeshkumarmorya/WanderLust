const express = require("express");
const Router = express.Router({ mergeParams: true });
const schemaValidate = require("../utils/schemaValidate");
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const { reviewSchema } = require("../schemaJoi");
const { isLoggedIn, isReviewAuthor } = require("../Middleware");
const reviewsController = require("../controllers/reviewController");

Router.post(
    "/",
    isLoggedIn,
    schemaValidate(reviewSchema),
    wrapAsync(reviewsController.createReview)
);

// delete review route
Router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewsController.destroyReview)
);

module.exports = Router;
