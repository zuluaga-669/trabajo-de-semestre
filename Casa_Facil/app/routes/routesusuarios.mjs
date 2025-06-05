import express from 'express';
import {buscarUsuario,vistaUsuario,guardarUsuario} from '../controllers/controllerUsuarios.mjs';

const router = express.Router();


// router.get('/usuarios', listarUsuarios);


router.post('/registroUsuarios', guardarUsuario);

// router.put('/usuarios/:usuarioId', actualizarUsuarioController);


// router.delete('/usuarios/:usuarioId', eliminarUsuarioController);

router.post('/login', buscarUsuario)

router.post('/vistaUsuario', vistaUsuario)

export default router; 