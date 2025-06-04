import express from 'express';
import {
buscarUsuario,cargarinfoUsuario
} from '../controllers/controllerUsuarios.mjs';

const router = express.Router();

// Ruta para obtener todos los usuarios
// router.get('/usuarios', listarUsuarios);

// Ruta para crear un nuevo usuario
// router.post('/usuarios', guardarUsuario);

// Ruta para actualizar un usuario existente
// router.put('/usuarios/:usuarioId', actualizarUsuarioController);

// Ruta para eliminar un usuario
// router.delete('/usuarios/:usuarioId', eliminarUsuarioController);

router.post('/login', buscarUsuario)

router.post('/vistaUsuario', cargarinfoUsuario)

export default router; 