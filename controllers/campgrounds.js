const Campground = require("../models/campground");
module.exports.index = async (req, res) => {
  const camp = await Campground.find({});
  res.render("campgrounds/index", { camp });
};

module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.renderCampDetails = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id)
    .populate({ path: "review", populate: { path: "author" } })
    .populate("author");
  console.log(camp);
  res.render("campgrounds/show", { camp });
  console.log(id);
};

module.exports.renderUpdateForm = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  res.render("campgrounds/update", { camp });
};

module.exports.newCampground = async (req, res, next) => {
  const camp = new Campground(req.body);
  camp.author = req.user._id;
  await camp.save();
  req.flash("success", "Successfully made a new campground!");
  res.redirect(`/campgrounds/${camp._id}`);
};

module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndUpdate(id, req.body);
  res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
};
