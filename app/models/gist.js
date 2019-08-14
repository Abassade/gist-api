const mongoose = require('mongoose');

const gistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  gistImageUrl: {
    type: String,
    required: true
  }

},
{
  timestamps: true,
});

module.exports = mongoose.model('Gist', gistSchema);