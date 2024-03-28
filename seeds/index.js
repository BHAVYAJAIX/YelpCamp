const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./campname");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: "65f0815bc14481888ef0cb4f",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere explicabo quia omnis sit officia! Doloremque sit omnis qui ex beatae, exercitationem quasi iste assumenda obcaecati sapiente laudantium nulla, illum eum!",
      pictures: [
        {
          url: "https://res.cloudinary.com/dztwczbjs/image/upload/v1711602717/YelpCamp/ervdj3mzgd02rlzldmt2.jpg",
          filename: "YelpCamp/ervdj3mzgd02rlzldmt2",
        },
      ],
      price: Math.floor(Math.random() * 1000) + 500,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
