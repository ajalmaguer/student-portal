require('dotenv').load();
var mongoose = require('./database');

var Listing = require('../models/Listing')


var listings = [
{
  rent: 500,
  imageUrl: "https://a1.muscache.com/im/pictures/4b9291ff-8226-4767-9c9b-90c713b7c385.jpg?aki_policy=x_medium",
  title: "Super Central Santa Monica Stay",
  roomType: "Private Room",
  lookingFor: "male or female in the 20s and 30s",
  hostImgUrl: "https://a1.muscache.com/im/pictures/1f06226c-28e8-4883-96d8-6ed851f91b30.jpg?aki_policy=profile_medium",
  address: {
    address: "123 Broadway",
    address2: "Apt 3",
    city: "Los Angeles",
    state: "CA",
    zip: 91767
  },
  deposit: 500,
  moveInDate: new Date("6/1/2016"),
  duration: [0,6],
  description: "Clean, stylish digs just a short walk from beloved cafes, restaurants, SMC, a park across the street, bars, and a 5 minute drive to the beach! This relaxing spot comes complete with a TV with HBO and Netflix in your room as well as the living room and parking.",
  space: {
    accomodates:  2,
    bathrooms:    1,
    bedrooms:     1,
    propertyType: "Apartment"
  },
  amenities: {
    kitchen:            true,
    washer:             true,
    wifiIncluded:       true,
    utilitiesIncluded:  true,
    furnished:          true,
    ac:                 true,
    heating:            true,
    gym:                true,
    largeCloset:        true,
    tv:                 true,
    freeParking:        true,
    kitchen:            true,
    pool:               true
  },
  rules: {
    smoking:          false,
    pets:             false,
    extra: "You can smoke on the balcony but not indoors. There are snacks and water bottles in the dry pantry for you but the existing contents of the fridge are off limits. The shampoo and conditioner is open for your use. No stealing. Be respectful towards my neighbors :)"
  }
},
{
  rent: 800,
  imageUrl: "https://a2.muscache.com/im/pictures/cfd762e7-fcca-4148-a68e-61ab5cd39d9e.jpg?aki_policy=x_medium",
  title: "Private room on second floor house",
  roomType: "Private Room",
  lookingFor: "male or female in the 20s and 30s",
  hostImgUrl: "https://a0.muscache.com/im/pictures/e4a37c9a-25cb-4840-9aaa-ce33f6ed9bba.jpg?aki_policy=profile_medium",
  address: {
    address: "123 Broadway",
    address2: "Apt 3",
    city: "Los Angeles",
    state: "CA",
    zip: 91767
  },
  deposit: 800,
  moveInDate: new Date("6/1/2016"),
  duration: [12,12],
  description: "Clean, stylish digs just a short walk from beloved cafes, restaurants, SMC, a park across the street, bars, and a 5 minute drive to the beach! This relaxing spot comes complete with a TV with HBO and Netflix in your room as well as the living room and parking.",
  space: {
    accomodates:  2,
    bathrooms:    1,
    bedrooms:     1,
    propertyType: "Apartment"
  },
  amenities: {
    kitchen:            true,
    washer:             true,
    wifiIncluded:       true,
    utilitiesIncluded:  true,
    furnished:          true,
    ac:                 true,
    heating:            true,
    gym:                true,
    largeCloset:        true,
    tv:                 true,
    freeParking:        true,
    kitchen:            true,
    pool:               true
  },
  rules: {
    smoking:          false,
    pets:             false,
    extra: "You can smoke on the balcony but not indoors. There are snacks and water bottles in the dry pantry for you but the existing contents of the fridge are off limits. The shampoo and conditioner is open for your use. No stealing. Be respectful towards my neighbors :)"
  }
},
{
  rent: 1000,
  imageUrl: "https://a2.muscache.com/im/pictures/90ad9834-795a-4107-b5eb-9ddcb50ee9c7.jpg?aki_policy=x_medium",
  title: "Value Deal!",
  roomType: "Shared Room",
  lookingFor: "male or female in the 20s and 30s",
  hostImgUrl: "https://a0.muscache.com/im/pictures/e4a37c9a-25cb-4840-9aaa-ce33f6ed9bba.jpg?aki_policy=profile_medium",
  address: {
    address: "123 Broadway",
    address2: "Apt 3",
    city: "Los Angeles",
    state: "CA",
    zip: 91767
  },
  deposit: 1000,
  moveInDate: new Date("6/1/2016"),
  duration: [0,3],
  description: "Clean, stylish digs just a short walk from beloved cafes, restaurants, SMC, a park across the street, bars, and a 5 minute drive to the beach! This relaxing spot comes complete with a TV with HBO and Netflix in your room as well as the living room and parking.",
  space: {
    accomodates:  2,
    bathrooms:    1,
    bedrooms:     1,
    propertyType: "Apartment"
  },
  amenities: {
    kitchen:            true,
    washer:             true,
    wifiIncluded:       true,
    utilitiesIncluded:  true,
    furnished:          true,
    ac:                 true,
    heating:            true,
    gym:                true,
    largeCloset:        true,
    tv:                 true,
    freeParking:        true,
    kitchen:            true,
    pool:               true
  },
  rules: {
    smoking:          false,
    pets:             false,
    extra: "You can smoke on the balcony but not indoors. There are snacks and water bottles in the dry pantry for you but the existing contents of the fridge are off limits. The shampoo and conditioner is open for your use. No stealing. Be respectful towards my neighbors :)"
  }
},
{
  rent: 750,
  imageUrl: "https://a2.muscache.com/im/pictures/972952e3-5235-46c8-8417-c8873a70078f.jpg?aki_policy=x_medium",
  title: "Convenient location and best chinese restaurants",
  roomType: "Shared Room",
  lookingFor: "male or female in the 20s and 30s",
  hostImgUrl: "https://a0.muscache.com/im/pictures/643a2786-da1d-4553-89d0-546a3bd922c1.jpg?aki_policy=profile_medium",
  address: {
    address: "123 Broadway",
    address2: "Apt 3",
    city: "Los Angeles",
    state: "CA",
    zip: 91767
  },
  deposit: 750,
  moveInDate: new Date("6/1/2016"),
  duration: [6,12],
  description: "Clean, stylish digs just a short walk from beloved cafes, restaurants, SMC, a park across the street, bars, and a 5 minute drive to the beach! This relaxing spot comes complete with a TV with HBO and Netflix in your room as well as the living room and parking.",
  space: {
    accomodates:  2,
    bathrooms:    1,
    bedrooms:     1,
    propertyType: "Apartment"
  },
  amenities: {
    kitchen:            true,
    washer:             true,
    wifiIncluded:       true,
    utilitiesIncluded:  true,
    furnished:          true,
    ac:                 true,
    heating:            true,
    gym:                true,
    largeCloset:        true,
    tv:                 true,
    freeParking:        true,
    kitchen:            true,
    pool:               true
  },
  rules: {
    smoking:          false,
    pets:             false,
    extra: "You can smoke on the balcony but not indoors. There are snacks and water bottles in the dry pantry for you but the existing contents of the fridge are off limits. The shampoo and conditioner is open for your use. No stealing. Be respectful towards my neighbors :)"
  }
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
