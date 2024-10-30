const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('./user')
const Campaign = require('../models/campaign'); // Import Campaign model or schema
const multer = require('multer');


// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/'); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
  }
});

const upload = multer({ storage: storage });




// POST /api/campaigns - Create a new campaign with file upload
router.post('/', upload.single('pdfFile'),isAuthenticated, async (req, res) => {
  try {
    //user ka data
    const userData = req.user
    console.log(userData)
    // Create a new campaign record in the database
    const campaign = await Campaign.create({ 
      title: req.body.title,
      description: req.body.description,
      goalAmount: req.body.goalAmount,
      pdfFile: req.file.filename, // 
      verified: false,
      user: req.user
    });
    console.log(campaign.user)
    res.status(201).json(campaign); // Return the created campaign as JSON response
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

//Fetch karney specific campaign
router.get('/:id',isAuthenticated,async (req, res) => {
  const campaignId = req.params.id;

  try {
    const campaign = await Campaign.findById(campaignId).populate('user');
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
});


// Fetch karney data from mongodb pura campaigns ka
router.get('/', isAuthenticated, async (req, res) => {
  try {
    // Fetch all campaigns from the database
    //user ka data
    const userData = req.user
    console.log(userData)
    const campaigns = await Campaign.find({
      verified: true,
      status: 'ongoing'
    });
    res.json(campaigns); // Send the list of campaigns as JSON response

  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

module.exports = router;
