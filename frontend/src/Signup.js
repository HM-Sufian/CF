import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Signup.module.css'; // Importing the CSS Module

function Signup() {
    const [username, setName] = useState('');
    const [phone_no, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const backendUrl = 'http://localhost:5000';
    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${backendUrl}/api/register`, { username, phone_no, email, password })
            .then(res => {
                navigate('/login');
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
                    <h1>Register</h1>
                    <p>Create a new account</p>
                </div>
                <form className={styles.signupBody} onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    <p>
                        <label htmlFor='username'>Name: </label>
                        <input type='text' name='username' value={username} onChange={(e) => setName(e.target.value)} required />
                    </p>
                    <p>
                        <label htmlFor='phone_no'>Phone No: </label>
                        <input type='number' name='phone_no' value={phone_no} onChange={(e) => setPhone(e.target.value)} required />
                    </p>
                    <p>
                        <label htmlFor='email'>Email: </label>
                        <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </p>
                    <p>
                        <label htmlFor='password'>Password: </label>
                        <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </p>
                    <p>
                        <input type='submit' value='Register' />
                    </p>
                </form>
                <div className={styles.signupFooter}>
                    <p>Already have an account? <Link to="/login" className={styles.loginLink}>Log in</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
