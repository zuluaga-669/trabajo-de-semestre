/**
 * Rutas para la consulta de casas.
 * Este archivo define las rutas HTTP que permiten acceder a los diferentes endpoints
 * relacionados con la consulta de casas en el sistema.
 */

import express from 'express';
import { consultaCasas, consultaCasaPorId, consultaCasasPorUsuarioId, consultaCasasPorFechaReciente } from '../../../../../trabajo-de-semestre/Casa_Facil/app/controllers/controllerConsultaCasas.mjs';

const router = express.Router();

/**
 * @route GET /casas
 * @description Obtiene todas las casas registradas
 * @access Public
 */
router.get('/casas', consultaCasas);

/**
 * @route GET /casas/:casaId
 * @description Obtiene una casa específica por su ID
 * @access Public
 * @param {number} casaId - ID de la casa a consultar
 */
router.get('/casas/:casaId', consultaCasaPorId);

/**
 * @route GET /casas/usuario/:usuarioId
 * @description Obtiene todas las casas de un usuario específico
 * @access Public
 * @param {number} usuarioId - ID del usuario cuyas casas se quieren consultar
 */
router.get('/casas/usuario/:usuarioId', consultaCasasPorUsuarioId);

/**
 * @route GET /casas/recientes
 * @description Obtiene todas las casas ordenadas por fecha de creación descendente
 * @access Public
 */
router.get('/casas/recientes', consultaCasasPorFechaReciente);

export default router;
