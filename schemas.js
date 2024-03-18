const Joi = require("joi");
module.exports.campgroundsSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required().min(0),
  location: Joi.string().required(),
  picture: Joi.string().required(),
  description: Joi.string(),
});
module.exports.reviewsSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(0).max(5),
    body: Joi.string().required(),
  }).required(),
});
