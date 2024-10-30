const express = require('express');
const router = express.Router();
const Donation = require('../models/donation');
const Campaign = require('../models/campaign');
const { isAuthenticated } = require('./user');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Razorpay instance
const instance = new Razorpay({
  key_id: 'rzp_test_dQqxUGF8mQrSWg',
  key_secret: 'o0AeSK0WiXO3VRILsLA1A03h'
});

// GET /api/donate/campaign/:campaignId - Fetch all donations for a specific campaign
router.get('/campaign/:campaignId',isAuthenticated, async (req, res) => {
  const campaignId = req.params.campaignId;
  try {
    const donations = await Donation.find({ campaignId });
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// POST /api/donate - Create an order
router.post('/',isAuthenticated, async (req, res) => {
  const { campaignId, amount } = req.body;

  try {
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex')
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong!' });
      }
      res.status(200).json({ order });
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// POST /api/donate/verify - Verify payment and update donation record
router.post('/verify', isAuthenticated,async (req, res) => {
  const { order_id, payment_id, signature, campaignId, amount, userId } = req.body;
  const userData = req.user;
  const hmac = crypto.createHmac('sha256', instance.key_secret);
  hmac.update(order_id + '|' + payment_id);
  const generatedSignature = hmac.digest('hex');

  if (generatedSignature === signature) {
    try {
      const newDonation = new Donation({
        campaignId,
        amount,
        transactionId: payment_id,
        status: 'success',
        userId:userData.username
      });
      await newDonation.save();

      const campaign = await Campaign.findById(campaignId);
      if (campaign) {
        campaign.collectedAmount = (campaign.collectedAmount || 0) + Number(amount);
        await campaign.save();
      }

      res.status(200).json({ data: newDonation });
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ error: 'Failed to verify payment' });
    }
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
});

module.exports = router;
