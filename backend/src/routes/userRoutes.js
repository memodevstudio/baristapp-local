// src/routes/userRoutes.js

const express = require('express');
const createUser = require('../controllers/createUser');
const getUsers = require('../controllers/getUsers');

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);

module.exports = router;
