const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const campaignRoutes = require('./routes/campaign');
const adminRoutes = require('./routes/admin')
const { userRouter } = require('./routes/user')
const donateRoutes = require('./routes/donation')
const { adminAuthRoutes } = require('./routes/adminAuth');
const userDetailRouter = require('./routes/userDetails');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST","PUT"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Middleware
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/files",express.static("files"))

mongoose.connect('mongodb://127.0.0.1:27017/crowdfunding-app',{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



//Routes mein hai na o use karlako
app.use('/api/campaigns/', campaignRoutes);
app.use('/api/admin/', adminRoutes)
app.use('/api/', userRouter)
app.use('/api/donate/', donateRoutes)
app.use('/api/admins/', adminAuthRoutes)
app.use('/api/user/',userDetailRouter)
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
