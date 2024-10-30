// CampaignList.js
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Navigation from './Navigation';
import './CampaignList.css';
import Navigationn from './Navigationn';

const backendUrl = 'http://localhost:5000';

const CampaignList = () => {
  // State to store the list of campaigns
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  // Function to fetch campaigns from backend
  const fetchCampaigns = async () => {
    try {
      // Make a GET request to fetch campaigns from backend
      const response = await axios.get(backendUrl+'/api/campaigns', { withCredentials: true });
      // Update state with the fetched campaigns
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  // Function to handle donation
  const handleDonation = (campaignId) => {
    // Implement donation process here (e.g., open donation modal)
    navigate(`/donate/${campaignId}`);
    console.log(`Donating to campaign with ID: ${campaignId}`);
  };

  // Fetch campaigns when component mounts
  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <>
     {/* <div className='nav-campaign-list'><Navigationn />
        <h2>Donate Now</h2>
      </div> */}
    <div className="campaign-list-container">
      <h2 className="campaign-list-title">Find The Popular Cause And Donate Them</h2>
      <div className="campaign-list">
        {/* Render the list of campaigns */}
        {campaigns.map(campaign => (
          <div className="campaign-card" key={campaign._id}>
            {/* <img src={campaign.image} alt={campaign.title} className="campaign-image" /> */}
            <div className="campaign-details">
              <h3 className="campaign-title">{campaign.title}</h3>
              <p className="campaign-description">{campaign.description}</p>
              <p className="campaign-goal">Goal Amount: ₹{campaign.goalAmount}</p>
              {/* Donation button */}
              <button className="donate-button" onClick={() => handleDonation(campaign._id)}>Donate</button>
            </div>
          </div>
        ))}
      </div>
      </div>
      </>
  );
};

export default CampaignList;
