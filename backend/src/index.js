const express = require('express');
const cors = require('cors');                    // ← AGREGADO
const app = express();

//importar rutas
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

//middlewares
app.use(cors());                                 // ← AGREGADO
app.use(express.json());

//rutas
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

//ruta base

app.get('/', (req, res) => res.send('Pong'));

//arranque servidor

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
