import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CampaignCards.css';

const CampaignCards = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/campaigns',
          { withCredentials: true }
        ); // Replace with your API endpoint
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, campaigns.length - itemsPerPage)
    );
  };

  const displayedCampaigns = campaigns.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );
  // Function to handle donation
  const handleDonation = (campaignId) => {
    // Implement donation process here (e.g., open donation modal)
    navigate(`/donate/${campaignId}`);
    console.log(`Donating to campaign with ID: ${campaignId}`);
  };
  return (
    <div className="container">
      <h2 className="campaign-list-title">
        Find The Popular Cause And Donate Them
      </h2>
      <div className="carousel-container">
        <button
          className="arrow left-arrow"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          &lt;
        </button>
        <div className="carousel-cards">
          {displayedCampaigns.map((campaign) => (
            <div key={campaign._id} className="campaign-card">
              <div className="campaign-details">
                <h3 className="campaign-title">{campaign.title}</h3>
                <p className="campaign-description">{campaign.description}</p>
                <p className="campaign-goal">
                  Goal Amount: {campaign.goalAmount}
                </p>
                <button
                  className="donate-button"
                  onClick={() => handleDonation(campaign._id)}
                >
                  Donate
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="arrow right-arrow"
          onClick={handleNext}
          disabled={currentIndex >= campaigns.length - itemsPerPage}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CampaignCards;
