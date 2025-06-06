import express from 'express';
import { createCasa, getAllCasas } from '../controllers/controllerPropiedades.mjs';
import { upload } from '../../cliente/js/configUploads.mjs';

const router = express.Router();

router.post('/registroCasas', upload.array('imagenes', 8), createCasa);

router.get('/index', getAllCasas)

export default router;




