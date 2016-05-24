require('dotenv').load();
var mongoose = require('./database');

var Listing = require('../models/Listing')


var listings = [
  {
    lookingFor: "male or female",
    rent: 1000,
    deposit: 500,
    startDate: new Date('6/1/2016'),
    leaseType: "lease",
    leaseDuration: [6, 12],
    propertyType: "apartment",
    numRooms: 2,
    numBathrooms: 1,
    amenities: ["wifi", "utilities"],
    rules: ["no smoking"],
    address: {
      address: "2870 N Towne Ave.",
      address2: "Apt 28",
      city: "Pomona",
      state: "CA",
      zip: 91767
    },
    description: String,
    photos: ["img1.jpg", "img2.jpg"],
    faqs: [{question: "how close is it to school?", answer: "10 min away."}]
  },
  {
    lookingFor: "female",
    rent: 500,
    deposit: 500,
    startDate: new Date('6/5/2016'),
    leaseType: "sublease",
    leaseDuration: [3, 3],
    propertyType: "house",
    numRooms: 3,
    numBathrooms: 2,
    amenities: ["wifi", "utilities"],
    rules: ["no smoking"],
    address: {
      address: "13612 Persimmon Rd ",
      city: "Moreno Valley",
      state: "CA",
      zip: 92553
    },
    description: String,
    photos: ["img1.jpg", "img2.jpg"],
    faqs: [{question: "how close is it to school?", answer: "30 min with traffic."}]
  }
]

Listing.remove({}, function (err) {
  if (err) console.log(err)
  Listing.create(listings, function (err, listings) {
    if (err) {
      console.log(err)
    } else {
      console.log("Database seeded with " + listings.length + " shows.")
      mongoose.connection.close()
    }
    process.exit()
  })
})

// var User = require('../models/user');

// User
//   .remove({})
//   .then(function() {
//     console.log('All users removed…');

//     return mongoose.connection.close();
//   })
//   .then(function() {
//     process.exit(0);
//   });
