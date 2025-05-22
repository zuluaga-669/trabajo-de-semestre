import express from 'express';
//import gastoRoutes from './app/routes/gastoRoutes.mjs';

const port = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static('cliente'));  // Sirve archivos estáticos como tu frontend

// Ruta para la página inicial
app.get('/', (req, res) => {
    res.sendFile('html/home.html', { root: './cliente' });
});

// Rutas
//app.use('/', gastoRoutes);  // Usamos las rutas definidas para gastos

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});