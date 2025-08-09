// src/controllers/createUser.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const generateUsername = require('../utils/users/generateUsername');

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const name = (req.body.name || '').trim();
  const email = (req.body.email || '').trim().toLowerCase();
  const password = (req.body.password || '').trim();

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    // (opcional) pre-chequeo de email
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'El correo ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Manejo simple de colisiones de username
    let username = generateUsername(name);
    for (let i = 0; i < 3; i++) {
      const taken = await prisma.user.findUnique({ where: { username } });
      if (!taken) break;
      username = `${generateUsername(name)}${Math.floor(Math.random() * 1000)}`;
    }

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, username },
      select: { id: true, name: true, email: true, username: true, createdAt: true },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email o username ya en uso.' });
    }
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = createUser;
