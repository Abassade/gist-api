const mongoose = require('mongoose');

const gistSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
},
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
  },
  likes: {
    type: Number,
    default: 0,
  //   validate: {
  //     validator: (like)=> {
  //         return typeof like === Number;
  //     },
  //     message: 'likes must be of type (Number)'
  // }
  }

},
{
  timestamps: true,
});

module.exports = mongoose.model('Gist', gistSchema);