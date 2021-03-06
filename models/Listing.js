var mongoose = require('mongoose');

var listingSchema = mongoose.Schema({
  rent: Number,
  imageUrl: String,
  title: String,
  roomType: String,
  lookingFor: String,
  hostImgUrl: String,
  hostId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

  deposit: Number,
  moveInDate: Date,
  duration: String,
  description: String,
  space: {},
  amenities: [{description: String, value:Boolean}],
  rules: [{description: String, value:Boolean}],
  houseRules: String,

  address: {
    address: String,
    address2: String,
    city: String,
    state: String,
    zip: Number
  },
  faqs: [{question: String, answer: String}],
  created_at: Date,
  updated_at: Date,
  favUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

var Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing;
