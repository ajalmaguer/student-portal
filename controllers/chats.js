var Chat = require('../models/Chat')

module.exports = {
  create: create
}

function create(req, res, next) {
  var newChat       = new Chat
  newChat.listingId = req.body.listingId
  newChat.user      = req.decoded._id
  newChat.host      = req.body.hostId
  newChat.messages.push(req.body.message)

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
