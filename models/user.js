const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user'
  },
  resetPasswordLink: {
    data: String,
    default: ''
  },
  todos: {
    type: Array,
  }
},
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
