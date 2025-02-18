const express = require('express');
const router = express.Router();
const login = require('../backend/controllers/loginController');

router.post('/', login);

module.exports = router;