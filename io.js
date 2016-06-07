var Chat = require('./models/Chat')
var User = require('./models/User')

var io = require('socket.io')();

io.on('connection', function (socket) {
  console.log('Client connected to socket.io!');
  socket.on('join', function (data) {
    socket.join(data.msgId); // We are using room of socket io
    console.log("successfully joined room ", data.msgId)
  });

});

module.exports = io;

