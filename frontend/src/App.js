import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CampaignList from './CampaignList';
import AdminDashboard from './AdminDashboard';
import PendingCampaign from './PendingCampaign';
import RejectedCampaign from './RejectedCampaign';
import OngoingCampaigns from './OngoingCampaigns';
import CompletedCampaigns from './CompletedCampaigns';
import Signup from './Signup';
import Login from './Login';
import About from './About';
import Home from './Home';
import DonationPage from './DonationPage';
import WithAdminAuth from './WithAdminAuth';
import AdminLogin from './AdminLogin';
import AdminRegister from './AdminRegister';
import UserProfile from './UserProfile';
// import CampaignDetails from './CampaignDetails';

import CampaignForm from './CampaignForm';
function App() {
  return (
    <Router>
      <Routes>
        {/* Define your navigation here */}
        <Route path="/" exact element={<Home />} />
        {/* <Route path="/campaigndetails" exact element={<CampaignDetails />} /> */}
        <Route path="/donate/:campaignId" exact element={<DonationPage />} />
        <Route path='/campaignform' exact element={<CampaignForm/>} />
        <Route path="/home" exact element={<Home/>} />
        <Route path="/adminDashboard" exact element={<AdminDashboard/>} />
        <Route path="/campaignList" exact element={<CampaignList />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/adminDashboard/pendingCampaign" exact element={<PendingCampaign />} />
        <Route path="/adminDashboard/rejectedCampaign" exact element={<RejectedCampaign />} />
        <Route path="/adminDashboard/ongoingCampaign" exact element={ <OngoingCampaigns />} />
        <Route path="/adminDashboard/completedCampaign" exact element= {<CompletedCampaigns/>} />
        <Route path="/register" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/adminDashboard" exact element={WithAdminAuth(AdminDashboard)} />
        <Route path="/adminDashboard/login" element={<AdminLogin />} />
        <Route path="/adminDashboard/register" element={<AdminRegister />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
