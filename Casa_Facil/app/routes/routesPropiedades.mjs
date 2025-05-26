import express from 'express';
import {
  crearPropiedadController,
  actualizarPropiedadController
} from '../controllers/controllerPropiedades.mjs';

const router = express.Router();

// Crear nueva propiedad
router.post('/', crearPropiedadController);

// Actualizar propiedad existente
router.put('/:id', actualizarPropiedadController);

export default router;
