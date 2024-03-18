const express = require("express");
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });
const campgrounds = require("../controllers/campgrounds");
const { isLoggedin, isOwner, validateCampground } = require("../middleware");

router.get("/", catchAsync(campgrounds.index));
router.get("/new", isLoggedin, campgrounds.renderNewForm);
router.get("/:id", isLoggedin, catchAsync(campgrounds.renderCampDetails));
router.get(
  "/:id/update",
  isLoggedin,
  isOwner,
  catchAsync(campgrounds.renderUpdateForm)
);

router.post(
  "/",
  isLoggedin,
  validateCampground,
  catchAsync(campgrounds.newCampground)
);
router.post(
  "/:id",
  isLoggedin,
  isOwner,
  validateCampground,
  catchAsync(campgrounds.updateCampground)
);
router.post(
  "/:id/delete",
  isLoggedin,
  isOwner,
  catchAsync(campgrounds.deleteCampground)
);

module.exports = router;
