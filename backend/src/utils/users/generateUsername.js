// src/utils/users/generateUsername.js

/**
 * Genera un nombre de usuario basado en el nombre completo.
 * Ejemplo: "Guillermo Holguín" → "guillermo-holguin"
 * 
 * @param {string} name - Nombre completo del usuario.
 * @returns {string} username generado.
 */
function generateUsername(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

module.exports = generateUsername;
