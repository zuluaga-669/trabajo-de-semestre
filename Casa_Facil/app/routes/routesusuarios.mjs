import express from 'express';
import {
    listarUsuarios,
    guardarUsuario,
    actualizarUsuarioController,
    eliminarUsuarioController
} from '../controllers/controllerUsuarios.mjs';

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/usuarios', listarUsuarios);

// Ruta para crear un nuevo usuario
router.post('/usuarios', guardarUsuario);

// Ruta para actualizar un usuario existente
router.put('/usuarios/:usuarioId', actualizarUsuarioController);

// Ruta para eliminar un usuario
router.delete('/usuarios/:usuarioId', eliminarUsuarioController);

export default router; 