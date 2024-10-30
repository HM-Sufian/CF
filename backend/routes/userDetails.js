const express = require('express');
const userDetailRouter = express.Router();
const User = require('../models/user');
const Campaign = require('../models/campaign');
const {isAuthenticated} = require('./user')

// Get user details and campaigns
userDetailRouter.get('/details', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID 
    const user = await User.findById(userId).select('-password'); // Exclude password
    const campaigns = await Campaign.find({ user: userId });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ user, campaigns });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

userDetailRouter.put('/update-phone', isAuthenticated, async (req, res) => {
    const { phone_no } = req.body;
  
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      user.phone_no = phone_no;
      await user.save();
  
      res.json({ msg: 'Phone number updated successfully' });
    } catch (err) {
      console.error('Error updating phone number:', err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = userDetailRouter;
