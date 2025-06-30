const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listing/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listing/new");
}

module.exports.showListing = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!listing) {
        throw new ExpressError(404, "Listing Not Found");
    }

    res.render("listing/show", { listing });
}

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    req.body.listing.image = {url, filename};
    req.body.listing.owner = req.user._id;
    const newListing = await Listing.create(req.body.listing);
    req.flash("success", "Listing created successfully!");
    res.redirect(`/listings/${newListing._id}`);
}

module.exports.editListing = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    res.render("listing/edit", { listing });
}

module.exports.updateListing = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { runValidators: true, new: true }
    );
    if (!listing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res, next) => {
    const { id } = req.params;
    const deleted = await Listing.findByIdAndDelete(id);
    if (!deleted) {
        throw new ExpressError(404, "Listing Not Found");
    }
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
}