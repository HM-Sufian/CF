const express = require('express');
const adminAuthRoutes = express.Router();
const Admin = require('../models/admin'); // Assuming you have an Admin model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

// Registration route
adminAuthRoutes.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    admin = new Admin({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    await admin.save();

    const payload = {
      admin: {
        id: admin.id
      }
    };

    jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error('Error in registration:', err.message);
    res.status(500).send('Server error');
  }
});

// Login route
adminAuthRoutes.post('/login', [
  check('username', 'Username is required').not().isEmpty(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    let admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      admin: {
        id: admin.id
      }
    };

    jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error('Error in login:', err.message);
    res.status(500).send('Server error');
  }
});


// Middleware to protect routes
const protect = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token failed' });
  }
};
const auth = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
adminAuthRoutes.get('/auth', auth, (req, res) => {
  res.json({ isAuthenticated: true });
});
adminAuthRoutes.post('/logout', auth, (req, res) => {
  res.clearCookie('token');
  res.json({ msg: 'Logout successful' });
});


module.exports = { adminAuthRoutes, protect };
