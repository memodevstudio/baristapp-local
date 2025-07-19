const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// 🔐 Clave secreta para firmar el token (¡puede ir en .env en producción!)
const JWT_SECRET = 'clave_secreta_super_segura';

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
  }

  try {
    // Buscar el usuario por su email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Si no existe, error
    if (!user) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
    }

    // Comparar contraseña con hash
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
    }

    // Generar token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Devolver el token y datos del usuario
    res.json({
      message: 'Inicio de sesión exitoso.',
      token,
      user: {
        name: user.name,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = { loginUser };
