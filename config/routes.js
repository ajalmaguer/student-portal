var express = require('express')
var router = express.Router()


var listingsCtrl = require('../controllers/listings')
var usersCtrl = require('../controllers/users')

// Require token authentication.
var token = require('../config/token_auth')

router.route('/api/users')
  .post(usersCtrl.create);

router.route('/api/token')
  .post(token.create);

router.route('/api/users/me')
  .get(token.authenticate, usersCtrl.me);

//

router.route('/api/listings')
  .get(listingsCtrl.index)
  .post(listingsCtrl.create)

router.route('/api/listings/:id')
  .get(listingsCtrl.show)
  .put(listingsCtrl.update)
  .delete(listingsCtrl.destroy)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendfile('public/index.html')
})

/* Redirect all other routes to the home page */
router.get('*', function(req, res, next) {
  res.redirect('/')
});

module.exports = router
