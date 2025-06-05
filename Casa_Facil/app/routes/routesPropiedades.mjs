import express from 'express';
import {
    getAllCasas,
    createCasa,
    updateCasa,
    deleteCasa,
    getCasasByUserId
} from '../controllers/controllerPropiedades.mjs';

const router = express.Router();

// Obtener todas las casas
router.get('/', getAllCasas);

// Crear una nueva casa
router.post('/registroCasas', createCasa);

// Actualizar casa
router.put('/:id', updateCasa);

// Eliminar casa
router.delete('/:id', deleteCasa);

// Obtener casas por ID de usuario
router.get('/usuario/:usuario_id', getCasasByUserId);

export default router;
