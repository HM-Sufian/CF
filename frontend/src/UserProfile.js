import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/details', { withCredentials: true });
        setUserDetails(response.data.user);
        setUserCampaigns(response.data.campaigns);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        navigate('/login'); // Redirect to login if there's an error
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewPhoneNumber(userDetails.phone_no);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put('http://localhost:5000/api/user/update-phone', {
        phone_no: newPhoneNumber
      }, { withCredentials: true });
      setUserDetails({ ...userDetails, phone_no: newPhoneNumber });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating phone number:', error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewPhoneNumber('');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles['user-profile-container']}>
      <h2>User Profile</h2>
      <div className={styles['user-details']}>
        <p><strong>Name:</strong> {userDetails.username}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p>
          <strong>Phone Number: </strong> 
          {isEditing ? (
            <>
              <input
                type="text"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
              />
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <>
              {userDetails.phone_no}
              <button onClick={handleEditClick}>Edit</button>
            </>
          )}
        </p>
      </div>

      <h2>My Campaigns: </h2>
      <div className={styles['user-campaigns']}>
        {userCampaigns.length === 0 ? (
          <p>No campaigns created.</p>
        ) : (
          userCampaigns.map((campaign) => (
            <div key={campaign._id} className={styles['campaign-card']}>
              <h4>{campaign.title}</h4>
                  <p>{campaign.description}</p>
              <p>Collected Amount: {campaign.collectedAmount}</p>
              <p>Status: {campaign.verified ?
                (campaign.status === 'ongoing' ? 'Active' : 'Completed')
                : (campaign.rejectionReason?  `Rejected, the reason is ${campaign.rejectionReason}` : 'Waiting for Approval')}</p>
              <p>Goal amount: {campaign.goalAmount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
