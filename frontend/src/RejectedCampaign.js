// RejectedCampaigns.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavigation from './AdminNavigation';
import SearchBar from './SearchBar'; // Import the search component
import { useNavigate } from 'react-router-dom';


const backendUrl = 'http://localhost:5000';

const RejectedCampaigns = () => {
  const [rejectedCampaigns, setRejectedCampaigns] = useState([]);
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  // Fetch rejected campaigns from backend
  useEffect(() => {
    const fetchRejectedCampaigns = async () => {
      try {
        const response = await axios.get(
          backendUrl + '/api/admin/rejected-campaigns'
        );
        setRejectedCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching rejected campaigns:', error);
      }
    };

    fetchRejectedCampaigns();
  }, []);

  const showPdf = async (pdfFile) => {
    window.open(`http://localhost:5000/files/${pdfFile}`,"_blank","noreferrer")
}
const filteredCampaigns = rejectedCampaigns.filter((campaign) => 
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


    <div>
      <h2 >Rejected Campaigns</h2>
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
            
            <p>Reason for rejection: {campaign.rejectionReason}</p>
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

export default RejectedCampaigns;
