var express = require('express')
var router = express.Router()


var listingsCtrl  = require('../controllers/listings')
var usersCtrl     = require('../controllers/users')
var chatsCtrl     = require('../controllers/chats')

// Require token authentication.
var token = require('../config/token_auth')


// --------------------------------
// Users
router.route('/api/users')
  .post(usersCtrl.create);

router.route('/api/token')
  .post(token.create);

router.route('/api/users/me')
  .get(token.authenticate, usersCtrl.me)

router.route('/api/users/me/listings')
  .get(token.authenticate, listingsCtrl.favListigs)

// --------------------------------
// Listings
router.route('/api/listings')
  .get(listingsCtrl.index)
  .post(token.authenticate, listingsCtrl.create)

router.route('/api/listings/:id')
  .get(listingsCtrl.show)
  .put(token.authenticate, listingsCtrl.update)
  .delete(token.authenticate, listingsCtrl.destroy)

router.route('/api/listings/:id/like')
  .put(token.authenticate, listingsCtrl.likeListing)

router.route('/api/listings/:id/dislike')
  .put(token.authenticate, listingsCtrl.dislikeListing)


// --------------------------------
// Chats
router.route('/api/chats')
  .post(token.authenticate, chatsCtrl.create)


// --------------------------------
/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendfile('public/index.html')
})

/* Redirect all other routes to the home page */
router.get('*', function(req, res, next) {
  res.redirect('/')
});

module.exports = router
