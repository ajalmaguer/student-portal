require('dotenv').load();
var mongoose = require('./database');

var Listing = require('../models/Listing')


var listings = [
  {
    imageUrls:    ["https://a1.muscache.com/im/pictures/4b9291ff-8226-4767-9c9b-90c713b7c385.jpg?aki_policy=x_medium", "https://a2.muscache.com/im/pictures/84653bf9-f642-4820-adf8-a7d781d7f012.jpg?aki_policy=x_medium"],
    rent:        $51,
    title:        "Super Central Santa Monica Stay",
    description:  "Private Room",
    hostImgUrl:   "https://a1.muscache.com/im/pictures/1f06226c-28e8-4883-96d8-6ed851f91b30.jpg?aki_policy=profile_medium"
  },
  {
    imageUrls:    ["https://a2.muscache.com/im/pictures/cfd762e7-fcca-4148-a68e-61ab5cd39d9e.jpg?aki_policy=x_medium", "https://a2.muscache.com/im/pictures/c87082f2-1c9c-4215-a01c-44ec37f65f52.jpg?aki_policy=x_medium"],
    price:        $41,
    title:        "Private room on second floor house",
    description:  "Private Room",
    hostImgUrl:   "https://a0.muscache.com/im/pictures/e4a37c9a-25cb-4840-9aaa-ce33f6ed9bba.jpg?aki_policy=profile_medium"
  },
  {
    imageUrls:    ["https://a2.muscache.com/im/pictures/90ad9834-795a-4107-b5eb-9ddcb50ee9c7.jpg?aki_policy=x_medium"],
    price:        $45,
    title:        "Value Deal!",
    description:  "Shared Room",
    hostImgUrl:   "carlos.png"
  },
  {
    imageUrls:    ["https://a2.muscache.com/im/pictures/53b8d507-6205-45d8-a582-a27a3bb620e9.jpg?aki_policy=x_medium"],
    price:        $59,
    title:        "Convenient location and best chinese restaurants",
    description:  "Shared Room",
    hostImgUrl:   "carlos.png"
  }
]

// var listings = [
//   {
//     lookingFor: "male or female",
//     rent: 1000,
//     deposit: 500,
//     startDate: new Date('6/1/2016'),
//     leaseType: "lease",
//     leaseDuration: [6, 12],
//     propertyType: "apartment",
//     numRooms: 2,
//     numBathrooms: 1,
//     amenities: ["wifi", "utilities"],
//     rules: ["no smoking"],
//     address: {
//       address: "2870 N Towne Ave.",
//       address2: "Apt 28",
//       city: "Pomona",
//       state: "CA",
//       zip: 91767
//     },
//     description: String,
//     photos: ["img1.jpg", "img2.jpg"],
//     faqs: [{question: "how close is it to school?", answer: "10 min away."}]
//   },
//   {
//     lookingFor: "female",
//     rent: 500,
//     deposit: 500,
//     startDate: new Date('6/5/2016'),
//     leaseType: "sublease",
//     leaseDuration: [3, 3],
//     propertyType: "house",
//     numRooms: 3,
//     numBathrooms: 2,
//     amenities: ["wifi", "utilities"],
//     rules: ["no smoking"],
//     address: {
//       address: "13612 Persimmon Rd ",
//       city: "Moreno Valley",
//       state: "CA",
//       zip: 92553
//     },
//     description: String,
//     photos: ["img1.jpg", "img2.jpg"],
//     faqs: [{question: "how close is it to school?", answer: "30 min with traffic."}]
//   }
// ]

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
