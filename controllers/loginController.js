const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDB } = require('../config/database');

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'bookKeeper'; // Use a more secure secret in production

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = { name, email, password: hashedPassword };

    const db = getDB();
    const result = await db.collection('Users').insertOne(user);
    res.status(201).json({ message: 'User registered', userId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = getDB();
    const user = await db.collection('Users').findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    const UserId = user._id;
    res.json({ message: 'Sign in successful', token, UserId  });
  } catch (err) {
    res.status(500).json({ error: 'Sign in failed' });
  }
};

const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const db = getDB();
    await db.collection('Users').updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Password update failed' });
  }
};

module.exports = { signup, signin, forgotPassword };
