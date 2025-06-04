import express from 'express';
import usuRoutes from './app/routes/routesusuarios.mjs';

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static('cliente')); 

// Rutas
app.use('/', usuRoutes);  

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});