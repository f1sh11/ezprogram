const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  identifier: { type: String, required: true, unique: true }, // 可以是用户名或邮箱
  password:   { type: String, required: true },
  role:       { type: String, enum: ['user', 'admin'], default: 'user', required: true }
});

module.exports = mongoose.model('User', userSchema);
