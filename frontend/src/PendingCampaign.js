import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavigation from './AdminNavigation';
import SearchBar from './SearchBar'; // Import the search component
import { useNavigate } from 'react-router-dom';
const backendUrl = 'http://localhost:5000';

const PendingCampaign = () => {
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [query, setQuery] = useState('')
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert("Login to Access the Dashboard")
      navigate('/admindashboard/login'); // Redirect to login if no token is found
      return;
    }
    const fetchPendingCampaigns = async () => {
      try {
        const response = await axios.get(
          backendUrl + '/api/admin/pending-campaigns'
        );
        setPendingCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching pending campaigns:', error);
      }
    };

    fetchPendingCampaigns();
  }, []);

  const handleVerifyCampaign = async (campaignId) => {
    try {
      await axios.put(`${backendUrl}/api/admin/verify-campaign/${campaignId}`);
      setPendingCampaigns(
        pendingCampaigns.filter((campaign) => campaign._id !== campaignId)
      );
    } catch (error) {
      console.error('Error verifying campaign:', error);
    }
  };

  const handleRejectCampaign = async (campaignId) => {
    try {
      const reason = prompt('Enter rejection reason:');
      if (reason) {
        await axios.put(
          `${backendUrl}/api/admin/reject-campaign/${campaignId}`,
          { reason }
        );
        setPendingCampaigns(
          pendingCampaigns.filter((campaign) => campaign._id !== campaignId)
        );
      }
    } catch (error) {
      console.error('Error rejecting campaign:', error);
    }
  };

  const showPdf = async (pdfFile) => {
      window.open(`http://localhost:5000/files/${pdfFile}`,"_blank","noreferrer")
  }
  const filteredCampaigns = pendingCampaigns.filter((campaign) => 
    campaign.title.toLowerCase().includes(query.toLowerCase()) ||
    campaign.user.username.toLowerCase().includes(query.toLowerCase())
  );
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Remove the token from localStorage
    navigate('/admindashboard/login'); // Redirect to login page
  }
  return (
      <div>
      <div className="admin-container">
        <div className="admin-header">
        <h2 className="admin-title">Admin Dashboard</h2>
        <button className="admin-logout" onClick={handleLogout}>Logout</button>
        </div>
        <SearchBar query={query} setQuery={setQuery} /> {/* Add the search bar */}
      <AdminNavigation />
      </div>

      <h2>Pending Campaigns</h2>
      {filteredCampaigns.map((campaign) => (
        <div key={campaign._id} className="campaign">
          <h4>{campaign.title}</h4>
          {campaign.user && (
            <div>
              <p>Name: {campaign.user.username}</p>
              <p>Email: {campaign.user.email}</p>
              <p>Phone: {campaign.user.phone_no}</p>
            </div>
          )}
          <p>Description: {campaign.description}</p>
          <p>Collected Amount: {campaign.collectedAmount}</p>
          <p>Goal amount: {campaign.goalAmount}</p>
          {/* Display user data */}
          
          {console.log(campaign.user.email)}
          <div className="buttons">
          <button
            className="verify-button"
            onClick={() => handleVerifyCampaign(campaign._id)}
          >
            Verify
          </button>
          <button
            className="reject-button"
            onClick={() => handleRejectCampaign(campaign._id)}
          >
            Reject
          </button>
          <button
            className="show-pdf-button"
            onClick={() => showPdf(campaign.pdfFile)} >
            Show PDF 
          </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingCampaign;
