import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import usuRoutes from './app/routes/routesusuarios.mjs';
import propiedadesRoutes from './app/routes/routesPropiedades.mjs';

const port = 3000;
const app = express();

// Resolver __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (css, js, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'cliente')));

// Rutas API
app.use('/api/usuarios', usuRoutes);
app.use('/api/casas', propiedadesRoutes);

// Rutas para HTML individuales
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'cliente', 'html', 'home.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'cliente', 'html', 'login.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'cliente', 'html', 'registroUsuarios.html'));
});

app.get('/registro-casas', (req, res) => {
  res.sendFile(path.join(__dirname, 'cliente', 'html', 'registroCasas.html'));
});

app.get('/vista-usuario', (req, res) => {
  res.sendFile(path.join(__dirname, 'cliente', 'html', 'vistaUsuario.html'));
});

app.get('/recuperar-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'cliente', 'html', 'recuperar-password.html'));
});

app.get('/dashbord', (req, res) => {
  res.sendFile(path.join(__dirname, 'cliente', 'html', 'dashbord.html'));
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${port}`);
});
