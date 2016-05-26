var User = require("../models/User");

module.exports = {
  create: create,
  me:     me
};

function create(req, res, next) {
  if (!req.body.password) {
    return res.status(422).send('Missing required fields');
  }
  User
    .create(req.body)
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully created user.',
        data: {
          email: user.email,
          id:    user._id
        }
      });
    }).catch(function(err) {
      if (err.message.match(/E11000/)) {
        err.status = 409;
      } else {
        err.status = 422;
      }
      next(err);
    });
};

// adding a listing id to the user
// function update(req, res, next) {
//   User
//     .findOne({_id: req.decoded._id}).exec()
//     .catch(function (err){
//       next(err)
//     })
//     .then(function(user){
//       user.favListings.push(req.body.listingId)
//       user.save(function(err, updatedUser){
//         if (err) next(err)
//         res.json(updatedUser)
//       })
//     })
// }

function me(req, res, next) {
  console.log("LOOK HERE: ", req)
  User
    .findOne({_id: req.decoded._id}).exec()
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully retrieved user data.',
        data: user
      });
    })
    .catch(function(err) {
      next(err);
    });
};
