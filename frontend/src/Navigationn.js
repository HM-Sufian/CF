import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import s from './Navigationn.module.css';
const backendUrl = 'http://localhost:5000';

function Navigationn() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data if authenticated
    const fetchUser = async () => {
      try {
        const response = await axios.get(backendUrl+'/api/me', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(backendUrl+'/api/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className={`${s.container} ${s.mainnav} ${s.flex}`}>
      <div className={`${s.logo}`}>
        <h2>Helping Hub</h2>
      </div>
      <div className={`${s.navlinks}`}>
        <ul className={s.flex}>
          <li><a href="#home" className={`${s.hoverlinks}`}>Home</a></li>
          <li><a href="#about" className={`${s.hoverlinks}`}>About</a></li>
          <li><a href="#causes" className={`${s.hoverlinks}`}>Causes</a></li>
          <li><a href="#gallery" className={`${s.hoverlinks}`}>Gallery</a></li>
          {!user ? (
            <>
              <li><Link to="/register" className={`${s.hoverlinks} ${s.primarybutton}`}>Sign up</Link></li>
              <li><Link to="/login" className={`${s.hoverlinks} ${s.secondarybutton}`}>Login</Link></li>
            </>
          ) : (
            <>
                <li><Link to='/userProfile' className={s.hoverlinks}>Hi, {user.username}</Link></li>
              <li><button onClick={handleLogout} className={`${s.hoverlinks} ${s.primarybutton}`}>Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navigationn;
