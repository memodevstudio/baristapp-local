const express = require('express');
const createUser = require('../controllers/createUser');
const getUsers = require('../controllers/getUsers');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Crear usuario (público)
router.post('/users', createUser);

// Listar usuarios (protegido: solo autenticados)
router.get('/users', verifyToken, getUsers);

// Obtener el usuario autenticado (protegido)
router.get('/me', verifyToken, (req, res) => {
  const { id, name, username, email } = req.user;
  res.json({ id, name, username, email });
});

module.exports = router;
