const jwt = require('jsonwebtoken');
const JWT_SECRET = 'clave_secreta_super_segura'; // en prod usa process.env.JWT_SECRET

function verifyToken(req, res, next) {
  const auth = req.headers.authorization || '';
  const [, token] = auth.split(' '); // "Bearer <token>"

  if (!token) return res.status(401).json({ error: 'Token no provisto' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { id, name, username, email }
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = verifyToken;
