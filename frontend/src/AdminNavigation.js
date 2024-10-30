import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function AdminNavigation() {

  return (
    <nav className='navigate'>
          
      <ul>
        <li>
          <Link to="/adminDashboard/pendingcampaign">Pending Campaign</Link>
              </li>
              <li>
          <Link to="/adminDashboard/ongoingcampaign">Ongoing Campaign</Link>
        </li>
        <li>
          <Link to="/adminDashboard/rejectedCampaign">Rejected Campaign</Link>
        </li>
        <li>
          <Link to="/adminDashboard/completedCampaign">Completed Campaign</Link>
        </li>
      </ul>
  

    </nav>
  );
}

export default AdminNavigation;
