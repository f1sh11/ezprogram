const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  identifier: { type: String, required: true, unique: true }, // This can be a username or email address
  password:   { type: String, required: true },
  role:       { type: String, enum: ['user', 'admin'], default: 'user', required: true }
});

module.exports = mongoose.model('User', userSchema);
