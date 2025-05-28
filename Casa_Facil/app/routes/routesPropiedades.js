import express from 'express';
import {
    getAllCasas,
    getCasaById,
    createCasa,
    updateCasa,
    deleteCasa,
    getCasasByUserId
} from '../controllers/casaController.js';

const router = express.Router();

// Obtener todas las casas
router.get('/', getAllCasas);

// Obtener una casa por ID
router.get('/:id', getCasaById);

// Obtener casas por ID de usuario
router.get('/usuario/:usuario_id', getCasasByUserId);

// Crear una nueva casa
router.post('/', createCasa);

// Actualizar una casa
router.put('/:id', updateCasa);

// Eliminar una casa
router.delete('/:id', deleteCasa);

export default router; 