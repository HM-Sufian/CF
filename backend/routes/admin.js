// routes/admin.js

const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign'); // Import Campaign model or schema
const user = require('../models/user');

// GET /api/admin/pending-campaigns - Fetch pending campaigns
router.get('/pending-campaigns', async (req, res) => {
  try {
    const pendingCampaigns = await Campaign.find({
      verified: false,
      rejectionReason: { $exists: false },
    }).populate('user', 'username phone_no email');
    res.json(pendingCampaigns);
  } catch (error) {
    console.error('Error fetching pending campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch pending campaigns' });
  }
});

// PUT /api/admin/verify-campaign/:id - Verify a campaign
router.put('/verify-campaign/:id', async (req, res) => {
  try {
    const campaignId = req.params.id;
    const updatedCampaign = await Campaign.findByIdAndUpdate(campaignId, {
      verified: true,
      status: 'ongoing',
    }).populate('user', 'username phone_no email');

    if (!updatedCampaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(updatedCampaign);
  } catch (error) {
    console.error('Error verifying campaign:', error);
    res.status(500).json({ error: 'Failed to verify campaign' });
  }
});

// Ongoing ka get
router.get('/ongoing-campaigns', async (req, res) => {
  try {
    // Find all campaigns with verification status set to true and status set to ongoing
    const ongoingCampaigns = await Campaign.find({
      verified: true,
      status: 'ongoing',
    }).populate('user', 'username phone_no email');
    res.json(ongoingCampaigns); // Return the ongoing campaigns as JSON response
  } catch (error) {
    console.error('Error fetching ongoing campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch ongoing campaigns' });
  }
});

// PUT /api/admin/reject-campaign/:id - Reject a campaign
router.put('/reject-campaign/:id', async (req, res) => {
  try {
    const campaignId = req.params.id;
    const rejectionReason = req.body.reason; // Assuming the rejection reason is sent in the request body

    const updatedCampaign = await Campaign.findByIdAndUpdate(campaignId, {
      verified: false,
      rejectionReason: rejectionReason,
    }).populate('user', 'username phone_no email');

    if (!updatedCampaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(updatedCampaign);
  } catch (error) {
    console.error('Error rejecting campaign:', error);
    res.status(500).json({ error: 'Failed to reject campaign' });
  }
});

// GET /api/admin/rejected-campaigns - Fetch rejected campaigns
router.get('/rejected-campaigns', async (req, res) => {
  try {
    const rejectedCampaigns = await Campaign.find({
      verified: false,
      rejectionReason: { $exists: true },
    }).populate('user', 'username phone_no email');
    res.json(rejectedCampaigns);
  } catch (error) {
    console.error('Error fetching rejected campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch rejected campaigns' });
  }
});

// PUT /api/admin/complete-campaign/:id - Mark a campaign as completed
router.put('/complete-campaign/:id', async (req, res) => {
  try {
    const campaignId = req.params.id;
    // Find the campaign by ID and update its status to 'completed'
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { status: 'completed' },
      { new: true }
    ).populate('user', 'username phone_no email');

    if (!updatedCampaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(updatedCampaign); // Return the updated campaign as JSON response
  } catch (error) {
    console.error('Error completing campaign:', error);
    res.status(500).json({ error: 'Failed to complete campaign' });
  }
});

// PUT /api/admin/reject-campaign/:id - Reject a campaign
router.put('/reject-campaign/:id', async (req, res) => {
  try {
    const campaignId = req.params.id;
    const rejectionReason = req.body.reason; // Assuming the rejection reason is sent in the request body

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { verified: false, rejectionReason: rejectionReason, status: 'rejected' },
      { new: true }
    ).populate('user', 'username phone_no email');

    if (!updatedCampaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(updatedCampaign);
  } catch (error) {
    console.error('Error rejecting campaign:', error);
    res.status(500).json({ error: 'Failed to reject campaign' });
  }
});

// GET /api/admin/completed-campaigns - Fetch completed campaigns
router.get('/completed-campaigns', async (req, res) => {
  try {
    // Find all campaigns with verification status set to true
    const completedCampaigns = await Campaign.find({
      verified: true,
      status: 'completed',
    }).populate('user', 'username phone_no email');
    res.json(completedCampaigns); // Return the completed campaigns as JSON response
  } catch (error) {
    console.error('Error fetching completed campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch completed campaigns' });
  }
});

module.exports = router;
