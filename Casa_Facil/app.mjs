import express from 'express';
import usuRoutes from './app/routes/routesusuarios.mjs';
import propiedadesRoutes from './app/routes/routesPropiedades.mjs'

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static('cliente')); 

// Rutas
app.use('/', usuRoutes);  
app.use('/', propiedadesRoutes)

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});