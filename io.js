var Chat = require('./models/Chat')
var User = require('./models/User')

var io = require('socket.io')();

io.on('connection', function (socket) {
  var msgId
  console.log('Client connected to socket.io!');

  socket.on('join', function (data) {
    socket.join(data.msgId); // We are using room of socket io
    msgId = data.msgId
    console.log("successfully joined room ", msgId)

    Chat
      .findById(msgId)
      .populate("user host")
      .exec().then(function (chat) {
        console.log(chat)
        socket.emit("loadChat", chat)
      })
      .catch(function (err) {
        io.in(msgId).emit("error", err)
      })
  });

  socket.on('newMsg', function (message) {
    console.log(message)
    Chat
      .findById(msgId)
      .then(function (chat) {

        chat.messages.push(message)


        chat.save(function (err, savedChat){
          console.log("savedChat =", savedChat)
          if (err) {
            socket.emit("error", err)
          } else {
            io.in(msgId).emit("newMsg", message)
          }
        })
      })
  })

});

module.exports = io;

