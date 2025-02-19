require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConect');
const taskRoutes = require('./routes/api/tasks');
const signupRoute = require('./routes/Signup');
const loginRoute = require('./routes/login');
const verifyJWT = require('./middleware/verifyJWT');

connectDB();

app.use(express.json());

// Routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);

app.use(verifyJWT);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT} `));