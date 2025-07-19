const express = require('express');
const router = express.Router();

// Importar el controlador
const { loginUser } = require('../controllers/auth/login');

// Ruta para iniciar sesión
// POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;
