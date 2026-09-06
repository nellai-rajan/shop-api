const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../config/mail');
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('User not found');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send('Invalid password');

  const token = jwt.sign(
    { id: user._id, role: user.role, username: user.username },
    process.env.JWT_SECRET
  );

  res.json({ token });
};

// REGISTER
exports.register = async (req, res) => {
  const { username, email, password ,role} = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).send('Email already exists');

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hash,
    role: role || 'customer',
  });

  res.json({ message: 'Registered', user });
};

// exports.register = async (req, res) => {

//   const { username, email, password, role, name, phone } = req.body;

//   try {
//     if(!name && username) {
//     const exists = await User.findOne({ email });
    
//     if (exists) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }
//   }
//     const finalUsername = username || name;

//     if (!finalUsername) {
//       return res.status(400).json({ message: "Username or name required" });
//     }

//     const hash = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       username: finalUsername,
//       email,
//       password: hash,
//       role: role || 'customer',
//       phone: phone || ''
//     });

//     res.json({
//       message: 'Registered successfully',
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role
//       }
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('User not found');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.resetOtp = otp;
  user.resetOtpExpiry = Date.now() + 5 * 60 * 1000;
  await user.save();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset OTP',
    html: `<h3>Your OTP is: ${otp}</h3><p>Valid for 5 minutes</p>`
  });

  res.json({ message: 'OTP sent to email' });
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).send('User not found');

  if (user.resetOtp !== otp || user.resetOtpExpiry < Date.now()) {
    return res.status(400).send('Invalid or expired OTP');
  }

  const hash = await bcrypt.hash(newPassword, 10);

  user.password = hash;
  user.resetOtp = null;
  user.resetOtpExpiry = null;

  await user.save();

  res.json({ message: 'Password reset successful' });
};