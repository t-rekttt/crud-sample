let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  fullname: String,
  email: { type: String },
  password: String,
  lastSearch: {
    page: Number,
    filter: String,
    sortBy: String,
    sortDirection: Number
  }
});

module.exports = mongoose.model('user', userSchema);