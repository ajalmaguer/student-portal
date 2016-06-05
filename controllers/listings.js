var Listing = require('../models/Listing')
var User    = require('../models/User')

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy,
  likeListing: likeListing,
  dislikeListing: dislikeListing,
  favListigs: favListigs
}

function index(req, res, next) {
  Listing.find({}, function(err, listings) {
    if (err) next(err);

    res.json(listings);
  });
}

function show(req, res, next) {
  var id = req.params.id;

  Listing
    .findById(id)
    .populate('user')
    .exec().then(function(listing) {
      res.json(listing);
    })
    .catch(function(err) {
      next(err)
    })
}

function create(req, res, next) {
  var newListing  = new Listing(req.body);
  var userId      = req.decoded._id

  //add the user's profile pic to the listing
  newListing.hostImgUrl = req.decoded.imageUrl
  newListing.hostId     = userId

  newListing.save(function(err, savedListing) {
    if (err) next(err);

    // Now add listing id to user
    User.findById(userId, function (err, user){
      user.listings.push(savedListing._id)

      user.save(function(err) {
        if (err) next(err)
        res.json(savedListing);
      })
    })
  });

}

function update(req, res, next) {
  var id = req.params.id;

  Listing.findById(id, function(err, listing) {
    if (err) next(err);

    for (var key in req.body) {
      listing[key] = req.body[key]
    }

    listing.save(function(err, updatedListing) {
      if (err) next(err);

      res.json(updatedListing);
    });

  });
}

function destroy(req, res, next) {
  var id = req.params.id;
  Listing.remove({_id:id}, function(err) {
    if (err) next(err);

    res.json({message: 'Listing successfully deleted'});
  });
}

function likeListing(req, res, next) {
  // res.json(req.body)
  Listing
    .findById(req.body.listingId)
    .then(function (listing) {
      listing.favUsers.push(req.decoded._id)

      listing.save(function (err, updatedListing) {
        if (err) next (err)
        res.json(updatedListing)
      })
    })
    .catch(function(err){
      next(err)
    })
}

function dislikeListing(req, res, next) {
  Listing
    .findById(req.body.listingId)
    .then(function (listing) {
      listing.favUsers.splice(listing.favUsers.indexOf(req.decoded._id),1)

      listing.save(function (err, updatedListing) {
        if (err) next (err)
        res.json(updatedListing)
      })
    })
    .catch(function(err){
      next(err)
    })
}

function favListigs(req, res, next) {
  Listing.find(
    {favUsers: {$in: [req.decoded._id]}},
    function(err, listings) {
      if (err) next(err);
      res.json(listings);
    })
}


