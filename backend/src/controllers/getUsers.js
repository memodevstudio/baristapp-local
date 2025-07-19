// src/controllers/getUsers.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Obtiene todos los usuarios registrados (sin contraseñas).
 */
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, username: true }
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getUsers;
