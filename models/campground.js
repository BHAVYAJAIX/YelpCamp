const mongoose = require("mongoose");
const { campgroundsSchema } = require("../schemas");
const Schema = mongoose.Schema;
const review = require("./reviews");
const user = require("./user");
const CampgroundSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
    required: true,
  },
  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await review.deleteMany({
      _id: {
        $in: doc.review,
      },
    });
  } else {
    console.log("No doc found");
  }
});
module.exports = mongoose.model("Campground", CampgroundSchema);
