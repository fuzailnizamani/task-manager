require('dotenv').config();
const Express = require('express');
const app = Express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConect');

connectDB();

app.use(Express.json());

app.get('/', (req, res) => {
  res.send('Task Manager API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT} `));