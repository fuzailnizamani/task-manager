require('dotenv').config();
const Express = require('express');
const app = Express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConect');
const taskRoutes = require('./routes/api/tasks');
const signupRoute = require('./routes/Signup');

connectDB();

app.use(Express.json());

// Routes
app.use('/tasks', taskRoutes);
app.use('/signup', signupRoute);

app.get('/', (req, res) => {
  res.send('Task Manager API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT} `));