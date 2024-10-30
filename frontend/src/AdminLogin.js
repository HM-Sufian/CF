import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLogin.module.css';

const backendUrl = 'http://localhost:5000';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const response = await axios.post(`${backendUrl}/api/admins/login`, { username, password });
        console.log(response)
      localStorage.setItem('adminToken', response.data.token);
      navigate('/adminDashboard');
    } catch (error) {
      setError('Failed to log in');
    }
  };

  return (
    <div className={styles.outerBox}>
      <div className={styles.innerBox}>
        <div className={styles.signupHeader}>
          <h1>Admin Login</h1>
        </div>
        {error && <p className="error">{error}</p>}
        <div className={styles.signupBody}>
          <p>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <p>
            <input type="submit" value="Login" onClick={handleLogin} />
          </p>
        </div>
        <div className={styles.signupFooter}>
          <p>
            Don't have an account? <a href="/adminDashboard/register">Register here</a>
          </p>
        </div>
        <div className={`${styles.circle} ${styles.c1}`}></div>
        <div className={`${styles.circle} ${styles.c2}`}></div>
      </div>
    </div>
  );
};

export default AdminLogin;
