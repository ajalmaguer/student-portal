var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

messageSchema = new mongoose.Schema({
  userId: String,
  text: String,
  created_at: Date,
  updated_at: Date
})

var chatSchema = new mongoose.Schema({
  listingId: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  host: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  messages: [messageSchema],
  created_at: Date,
  updated_at: Date
})


var Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
