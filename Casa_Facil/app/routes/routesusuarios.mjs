import express from 'express';
import { buscarUsuario, vistaUsuario, guardarUsuario, getAllData } from '../controllers/controllerUsuarios.mjs';


const router = express.Router();

router.post('/registroUsuarios', guardarUsuario);

router.post('/login', buscarUsuario)

router.post('/vistaUsuario', vistaUsuario)


router.get('/dashboard', getAllData);


export default router;







