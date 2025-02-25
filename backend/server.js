require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConect');
const taskRoutes = require('./routes/api/tasks');
const signupRoute = require('./routes/Signup');
const loginRoute = require('./routes/login');
const verifyJWT = require('./middleware/verifyJWT');
const cors = require('cors');

connectDB();

app.use(express.json());

app.use(cors({
  origin: 'http://192.168.100.94:5500', // Allow only your frontend origin
  credentials: true, // Allow credentials (cookies, tokens)
}));

// Routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);


app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT} `));