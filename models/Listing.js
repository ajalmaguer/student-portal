var mongoose = require('mongoose');

var listingSchema = mongoose.Schema({
  rent: Number,
  imageUrl: String,
  title: String,
  roomType: String,
  hostImgUrl: String,
  lookingFor: String,

  deposit: Number,
  moveInDate: Date,
  duration: [Number],
  description: String,
  space: {},
  amenities: {},
  rules: {},

  address: {
    address: String,
    address2: String,
    city: String,
    state: String,
    zip: Number
  },
  faqs: [{question: String, answer: String}],
  created_at: Date,
  updated_at: Date
});

var Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing;
