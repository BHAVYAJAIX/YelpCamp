const ExpressError = require("./utils/ExpressError");
const { campgroundsSchema, reviewsSchema } = require("./schemas");
const Review = require("./models/reviews");
const Campground = require("./models/campground");

module.exports.isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }
  next();
};

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundsSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    console.log(req.body);
    console.log(msg);
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  if (!camp.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission");
    return res.redirect("/campgrounds");
  }
  next();
};
module.exports.isReviewOwner = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const r = await Review.findById(reviewId);
  if (!r.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.validateReviews = (req, res, next) => {
  const { error } = reviewsSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    console.log(req.body);
    console.log(msg);
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
