import express from 'express';
import usuRoutes from './app/routes/routesusuarios.mjs';
import propiedadesRoutes from './app/routes/routesPropiedades.mjs'
import path from 'path';
import { fileURLToPath } from 'url';

const port = 3000;
const app = express();

app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('cliente'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Rutas
app.use('/', usuRoutes);
app.use('/', propiedadesRoutes)

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

