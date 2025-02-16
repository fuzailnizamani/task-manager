const User = require('../models/user');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  try {
    const { username, pwd } = req.body;
    if (!username || !pwd) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    const user = await User.findOne({ username });
    if (!user || !(bcrypt.compare(pwd, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: `${username} logged in successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error, please try again later.' });
  }
};

module.exports = login;