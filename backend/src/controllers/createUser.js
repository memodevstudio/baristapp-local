// src/controllers/createUser.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const generateUsername = require('../utils/users/generateUsername');

const prisma = new PrismaClient();

/**
 * Crea un nuevo usuario si el correo no existe.
 * Encripta la contraseña y genera un username.
 */
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'El correo ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const username = generateUsername(name);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, username },
    });

    const { password: _, ...userSafe } = user;
    res.status(201).json(userSafe);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = createUser;
