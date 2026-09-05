const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: { type: String, unique: true },
  role: { type: String, default: 'customer' },
  resetOtp: String,
  resetOtpExpiry: Date
},{timestamps:true,versionKey:false});

module.exports = mongoose.model('User', userSchema);