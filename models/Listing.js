var mongoose = require('mongoose');

var listingSchema = mongoose.Schema({
  lookingFor: String,
  rent: Number,
  deposit: Number,
  startDate: Date,
  leaseType: String,
  leaseDuration: [Number],
  propertyType: String,
  numRooms: String,
  numBathrooms: String,
  amenities: [String],
  rules: [String],
  address: {
    address: String,
    address2: String,
    city: String,
    state: String,
    zip: Number
  },
  description: String,
  photos: [String],
  faqs: [{question: String, answer: String}],
  created_at: Date,
  updated_at: Date
});

var Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing;
