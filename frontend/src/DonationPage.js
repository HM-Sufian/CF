import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from './Modal';
import './DonationPage.css';

const backendUrl = 'http://localhost:5000';

const DonationPage = () => {
  const { campaignId } = useParams();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCampaign = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/campaigns/${campaignId}`, { withCredentials: true });
      setCampaign(response.data);
    } catch (error) {
      console.error('Error fetching campaign:', error);
    }
  };

  const fetchDonations = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/donate/campaign/${campaignId}`, { withCredentials: true });
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  useEffect(() => {
    fetchCampaign();
    fetchDonations();
  }, [campaignId]);

  const initPayment = (data) => {
    const options = {
      key: 'rzp_test_dQqxUGF8mQrSWg',
      amount: data.amount * 100,
      currency: data.currency,
      name: campaign.title,
      description: "Test Transaction",
      order_id: data.order.id,
      handler: async (response) => {
        try {
          console.log(response);
          const verificationResponse = await axios.post(`${backendUrl}/api/donate/verify`, {
            order_id: data.order.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            campaignId,
            amount,
            userId:campaign.user.username, // Replace with actual user ID
          }, { withCredentials: true }
            
          );
          console.log(verificationResponse.data)
          if (verificationResponse.data) {
            setTransactionDetails({
              transactionId: response.razorpay_payment_id,
              amount: verificationResponse.data.data.amount,
              status: 'success',
            });
            setMessage('Donation successful');
            setIsModalOpen(true);
            fetchDonations();
            fetchCampaign();
          }
        } catch (error) {
          setMessage('Failed to verify payment');
          setIsModalOpen(true);
        }
      },
      modal: {
        ondismiss: () => {
          setMessage('Transaction cancelled');
          setIsModalOpen(true);
        }
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleDonation = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/donate`, {
        campaignId,
        amount,
      }, { withCredentials: true });
      initPayment(response.data);
    } catch (error) {
      console.error('Error processing donation:', error);
      setMessage('Failed to process donation');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage('');
    setTransactionDetails(null);
  };

  return (
    <div className="donation-page-container">
      <h3 className="donation-page-title">Donate to Campaign</h3>
      <div className='containcd'>
        {campaign && (
          <div className="campaign-details cd">
            <h3>{campaign.title}</h3>
            <p>Campaign created by {campaign.user.username}</p>
            <p>{campaign.description}</p>
            <p>Collected Amount: ₹{campaign.collectedAmount}</p>
            <p>Goal Amount: ₹{campaign.goalAmount}</p>
          </div>
        )}
        <div className="donation-form">
          <label htmlFor="amount">Donation Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className="donate-button" onClick={handleDonation}>Donate</button>
        </div>
      </div>
      <div className="donation-history">
        <h3>Donation History</h3>
        <table className="transaction-details">
          <thead>
            <tr>
              <th>Donor</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(donation => (
              <tr key={donation._id}>
                <td>{donation.userId}</td>
                <td>₹{donation.amount}</td>
                <td>{donation.transactionId}</td>
                <td>{donation.status}</td>
                <td>{new Date(donation.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {message && <p>{message}</p>}
        {transactionDetails && (
          <div className="transaction-details">
            <div className='modal'>
              <h4>Transaction Details</h4>
              <p>Transaction ID: {transactionDetails.transactionId}</p>
              <p>Amount Paid: ₹{transactionDetails.amount}</p>
              <p>Status: {transactionDetails.status}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DonationPage;
