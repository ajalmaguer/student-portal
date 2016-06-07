var Chat = require('../models/Chat')
var User = require('../models/User')

module.exports = {
  show:   show,
  create: create
}

function show(req, res, next) {
  console.log("show function running")
  var id = req.params.id

  Chat
    .findById(id)
    .populate("user host")
    .exec().then(function (chat) {
      res.json(chat)
    })
    .catch(function (err) {
      next(err)
    })
}

function create(req, res, next) {
  var newChat       = new Chat
  newChat.listingId = req.body.listingId
  newChat.user      = req.body.user
  newChat.host      = req.body.host
  newChat.messages  = req.body.messages

  newChat.save(function (err, savedChat) {
    if (err) next(err)

    // Add chat id to the user
    User.update(
       { _id: { $in: [savedChat.user, savedChat.host] } },
       { $push: { chats: savedChat._id } },
       { multi: true },
       function (err) {
        if(err) next(err)
        res.send(savedChat)
       }
    )

  })
}
