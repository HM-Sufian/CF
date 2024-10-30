import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AdminRegister.module.css';

const backendUrl = 'http://localhost:5000';

const AdminRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/admins/register`, { username, email, password });
      setMessage('Admin registered successfully');
      setTimeout(() => {
        navigate('/adminDashboard/login');
      }, 2000);
    } catch (error) {
      setError('Failed to register admin');
    }
  };

  return (
    <div className={styles.outerBox}>
      <div className={styles.innerBox}>
        <div className={styles.signupHeader}>
          <h1>Admin Register</h1>
        </div>
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <input type="submit" value="Register" onClick={handleRegister} />
          </p>
        </div>
        <div className={styles.signupFooter}>
          <p>
            Already have an account? <a href="/admindashboard/login">Login here</a>
          </p>
        </div>
        <div className={`${styles.circle} ${styles.c1}`}></div>
        <div className={`${styles.circle} ${styles.c2}`}></div>
      </div>
    </div>
  );
};

export default AdminRegister;
