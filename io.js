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

  socket.on('newMsg', function (data) {
    console.log(data)
    socket.broadcast.to(msgId).emit("newMsg", data)
  })

});

module.exports = io;

