import React, { useState } from 'react';
import axios from 'axios';
import styles from './CampaignForm.module.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
const backendUrl = 'http://localhost:5000';

function CampaignForm() {
  // State variables to store form data and PDF file
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object to send file along with other form data
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('goalAmount', parseFloat(goalAmount));

      // Append the PDF file to FormData if it exists
      if (pdfFile) {
        formData.append('pdfFile', pdfFile);
      }

      // Make a POST request to create a new campaign with form data and PDF file
      const response = await axios.post(`${backendUrl}/api/campaigns`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data for file upload
        }
      });

      // Display success message or perform any other actions
      console.log('Campaign created successfully:', response.data);

      // Clear the form fields after successful submission
      setTitle('');
      setDescription('');
      setGoalAmount('');
      setPdfFile(null); // Clear selected PDF file
      alert(`Campaign Created Successfully! \nCheck Status in User Profile`);
      navigate('/userProfile');
    } catch (error) {
      // Display error message or perform error handling
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <div className={styles['campaign-form']}>
      <h2 className={styles['headline']}>Create a New Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="goalAmount">Goal Amount (Rs):</label>
          <input
            type="number"
            id="goalAmount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="pdfFile">Upload Necessary Documents: </label>
          <input
            type="file"
            id="pdfFile"
            accept="application/pdf"
            required
            onChange={(e) => setPdfFile(e.target.files[0])}
          />
        </div>
        
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
}

export default CampaignForm;
