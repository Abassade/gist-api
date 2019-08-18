const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullname: {
    type: String,
    minlength: 5,
    match: /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: 7,
    required: true
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);