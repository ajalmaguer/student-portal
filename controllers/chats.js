var Chat = require('../models/Chat')
var User = require('../models/User')

module.exports = {
  create: create
}

function create(req, res, next) {
  console.log("create function hit")
  var newChat       = new Chat
  newChat.listingId = req.body.listingId
  newChat.user      = req.body.user
  newChat.host      = req.body.host
  newChat.messages  = req.body.messages

  newChat.save(function (err, savedChat) {
    if (err) next(err)

    // Add chat id to the user
    User
      .find({_id: {$in: [savedChat.user, savedChat.host]}})
      .exec(function (err, users) {
        console.log(users)
        res.send(savedChat)
      })
  })
}
