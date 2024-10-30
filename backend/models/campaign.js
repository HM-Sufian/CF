const mongoose = require('mongoose');

// Define the schema for the Campaign model
const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  goalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false  // Initial verification status is false
  },
  rejectionReason: {
    type: String // Field to store the reason for rejection
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'rejected'],
    default: 'ongoing'
  },
  pdfFile: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  collectedAmount: {
    type: Number,
    default: 0
  }
});

// Create and export the Campaign model
module.exports = mongoose.model('Campaign', campaignSchema);
