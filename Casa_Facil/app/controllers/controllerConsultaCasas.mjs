/**
 * Controlador para la consulta de casas.
 * Este archivo define las funciones que gestionan las solicitudes HTTP relacionadas con la consulta de casas,
 * incluyendo la obtención de todas las casas, una casa por su ID, casas por usuario y casas ordenadas por fecha reciente.
 */

import { getCasas, getCasaById, getCasasByUsuarioId, getCasasByFechaReciente } from '../models/modelConsultaCasas.mjs';

/**
 * Obtiene todas las casas registradas en el sistema.
 * 
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void} Devuelve un JSON con el listado de casas o un error.
 */
export const consultaCasas = async (req, res) => {
    try {
        const casas = await getCasas();
        res.status(200).json(casas);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar las casas' });
    }
};

/**
 * Obtiene la información de una casa específica según su ID.
 * 
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP, debe contener el parámetro 'casaId'.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void} Devuelve un JSON con la información de la casa o un error.
 */
export const consultaCasaPorId = async (req, res) => {
    const { casaId } = req.params;
    try {
        const casa = await getCasaById(casaId);
        if (casa) {
            res.status(200).json(casa);
        } else {
            res.status(404).json({ error: 'Casa no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar la casa' });
    }
};

/**
 * Obtiene todas las casas asociadas a un usuario específico.
 * 
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP, debe contener el parámetro 'usuarioId'.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void} Devuelve un JSON con el listado de casas del usuario o un error.
 */
export const consultaCasasPorUsuarioId = async (req, res) => {
    const { usuarioId } = req.params;
    try {
        const casas = await getCasasByUsuarioId(usuarioId);
        res.status(200).json(casas);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar las casas del usuario' });
    }
};

/**
 * Obtiene todas las casas ordenadas por la fecha más reciente de registro.
 * 
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {void} Devuelve un JSON con el listado de casas ordenadas por fecha o un error.
 */
export const consultaCasasPorFechaReciente = async (req, res) => {
    try {
        const casas = await getCasasByFechaReciente();
        res.status(200).json(casas);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar las casas por fecha' });
    }
};