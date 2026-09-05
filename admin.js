const bcrypt = require('bcrypt');
const User = require('./models/User');

async function createAdmin() {
  const hash = await bcrypt.hash('admin123', 10);

  await User.create({
    username: 'Nellairajan',
    password: hash,
    role: 'admin'
  });

  console.log('Admin created');
}

createAdmin();