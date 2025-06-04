import express from 'express';

const port = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static('cliente'));  

app.get('/', (req, res) => {
    debugger;
    res.sendFile('html/home.html', { root: './cliente' });
    
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});