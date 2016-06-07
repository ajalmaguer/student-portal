var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var userSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  name:     { type: String, required: true },
  imageUrl: { type: String, default: "https://a0.muscache.com/im/pictures/643a2786-da1d-4553-89d0-546a3bd922c1.jpg?aki_policy=profile_medium"},
  listings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Listing'}],
  chats: [{type: mongoose.Schema.Types.ObjectId, ref: 'Chat'}]
});

// add bcrypt hashing to model (works on a password field)!
userSchema.plugin(require('mongoose-bcrypt'));

// Add a "transformation" to the model's toJson function that
// stops the password field (even in digest format) from being
// returned in any response.
userSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password;
    return returnedObject;
  }
};

var User = mongoose.model('User', userSchema);

module.exports = User;
