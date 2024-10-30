// CompletedCampaigns.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavigation from './AdminNavigation';
import SearchBar from './SearchBar'; // Import the search component
import { useNavigate } from 'react-router-dom';
const backendUrl = 'http://localhost:5000';

const CompletedCampaigns = () => {
  const [completedCampaigns, setCompletedCampaigns] = useState([]);
  const [query,setQuery] = useState('')
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  // Fetch completed campaigns from backend
  useEffect(() => {
    const fetchCompletedCampaigns = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/admin/completed-campaigns`
        );
        setCompletedCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching completed campaigns:', error);
      }
    };

    fetchCompletedCampaigns();
  }, []);

  const showPdf = async (pdfFile) => {
    window.open(`http://localhost:5000/files/${pdfFile}`,"_blank","noreferrer")
  }
  const filteredCampaigns = completedCampaigns.filter((campaign) => 
    campaign.title.toLowerCase().includes(query.toLowerCase()) ||
    campaign.user.username.toLowerCase().includes(query.toLowerCase())
  );
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Remove the token from localStorage
    navigate('/admindashboard/login'); // Redirect to login page
  }
  return (
    <>
    <div className="admin-container">
    <div className="admin-header">
        <h2 className="admin-title">Admin Dashboard</h2>
        <button className="admin-logout" onClick={handleLogout}>Logout</button>
        </div>
        <SearchBar query={query} setQuery={setQuery} /> {/* Add the search bar */}
      <AdminNavigation />
      </div>
    <div >
      <h2 >Completed Campaigns</h2>
      <div>
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
            
            <button
            className="show-pdf-button"
            onClick={() => showPdf(campaign.pdfFile)} >
            Show PDF 
          </button>
          </div>
        ))}
      </div>
      </div>
      </>
  );
};

export default CompletedCampaigns;
