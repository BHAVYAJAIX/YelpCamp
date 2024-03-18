const express = require("express");
const Review = require("../models/reviews");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const reviews = require("../controllers/review");
const { validateReviews, isLoggedin, isReviewOwner } = require("../middleware");

router.post("/", isLoggedin, validateReviews, catchAsync(reviews.createReview));
router.post(
  "/:reviewId",
  isLoggedin,
  isReviewOwner,
  catchAsync(reviews.deleteReview)
);
module.exports = router;
