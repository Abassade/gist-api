const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullname: {
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
    maxlength: 14,
    required: true
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);