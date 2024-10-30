const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

userRouter.post('/register', async (req, res) => {
    try {
        const { username, phone_no, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User already registered. Please log in.' });
        }
        const hash = await bcrypt.hash(password, 13);
        const user = await userModel.create({
            username,
            phone_no,
            email,
            password: hash
        });
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user account:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const token = jwt.sign({ _id: user._id }, 'jwt-secret-key', { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'strict' });
        return res.status(200).json({ status: 'Success' });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Login failed' });
    }
});

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, 'jwt-secret-key');
        req.user = await userModel.findById(decoded._id);

        if (!req.user) {
            return res.status(401).json({ error: 'User not found. Please register' });
        }

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ error: 'Authentication failed' });
    }
};

// a aako o name bataney nav bar mein
userRouter.get('/me', isAuthenticated, async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
});
userRouter.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ status: 'Logged out' });
  });
  
module.exports = { userRouter, isAuthenticated };
