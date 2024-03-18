const Review = require("../models/reviews");
const Campground = require("../models/campground");
module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  console.log(`id is: ${req.params.id}`);
  const camp = await Campground.findById(id);
  if (!camp) {
    throw new ExpressError("Campground not found", 404);
  }
  const review = new Review(req.body.review);
  review.author = req.user._id;
  camp.review.push(review);
  await review.save();
  await camp.save();
  req.flash("success", "Created new review!");
  res.redirect(`/campgrounds/${camp._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { review: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/campgrounds/${id}`);
};
