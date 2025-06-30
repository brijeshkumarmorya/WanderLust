const express = require("express");
const Router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const schemaValidate = require("../utils/schemaValidate");
const { listingSchema } = require("../schemaJoi");
const { isLoggedIn, isOwner } = require("../Middleware");
const listingsController = require("../controllers/listingsController");
const multer  = require('multer');
const { storage } = require("../cloudConfig");
const upload = multer({ storage })

Router.route("/")
    // Index: Public
    .get(wrapAsync(listingsController.index))
    
    // Create: Protected + Validated
    .post(
        isLoggedIn,
        schemaValidate(listingSchema),
        upload.single('listing[image]'),
        wrapAsync(listingsController.createListing)
    );

// New form route
Router.get("/new", isLoggedIn, listingsController.renderNewForm);

Router.route("/:id")
    // Show listing (public)
    .get(wrapAsync(listingsController.showListing))

    // Update listing (protected & validated)
    .put(
        isLoggedIn,
        isOwner,
        schemaValidate(listingSchema),
        upload.single('listing[image]'),
        wrapAsync(listingsController.updateListing)
    )

    // Delete listing (protected)
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingsController.destroyListing)
    );

// Edit form route
Router.get("/:id/edit", isLoggedIn, wrapAsync(listingsController.editListing));

module.exports = Router;
