const express = require("express");
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
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
  upload.array("pictures"),
  validateCampground,
  catchAsync(campgrounds.newCampground)
);

router.post(
  "/:id",
  isLoggedin,
  upload.array("pictures"),
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
