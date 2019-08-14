const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  rePassword: {
    type: String,
    minlength: 8,
    required: true
  }

},
{
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);