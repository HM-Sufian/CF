import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // Importing the CSS Module

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const backendUrl = 'http://localhost:5000';
    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${backendUrl}/api/login`, { email, password })
            .then(res => {
                if (res.data.status === "Success") {
                    navigate('/');
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    setError(err.response.data.error);
                } else {
                    setError('An error occurred. Please try again.');
                }
            });
    }

    return (
        <div className={styles.outerBox}>
            <div className={`${styles.circle} ${styles.c1}`}></div>
            <div className={`${styles.circle} ${styles.c2}`}></div>
            <div className={styles.innerBox}>
                <div className={styles.signupHeader}>
                    <h1>Log In</h1>
                    <p>Welcome back! Please log in to your account.</p>
                </div>
                <form className={styles.signupBody} onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    <p>
                        <label htmlFor='email'>Email: </label>
                        <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </p>
                    <p>
                        <label htmlFor='password'>Password: </label>
                        <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </p>
                    <p>
                        <input type='submit' value='Login' />
                    </p>
                </form>
                <div className={styles.signupFooter}>
                    <p>Don't have an account? <Link to="/register" className={styles.registerLink}>Register</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
