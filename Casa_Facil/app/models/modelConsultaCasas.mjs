/**
 * Modelo para la consulta de casas.
 * Este archivo contiene las funciones que interactúan directamente con la base de datos
 * para realizar consultas relacionadas con las casas.
 */

import pool from '../../../../../trabajo-de-semestre/Casa_Facil/db/pool.mjs';

/**
 * Obtiene todas las casas de la base de datos.
 * 
 * @function
 * @async
 * @returns {Promise<Array>} Array de objetos con la información de todas las casas.
 * @throws {Error} Si ocurre un error en la consulta a la base de datos.
 */
export const getCasas = async () => {
    try {
        const result = await pool.query('SELECT * FROM casas');
        return result.rows;
    } catch (error) {
        throw error;
    }
};

/**
 * Obtiene una casa específica por su ID.
 * 
 * @function
 * @async
 * @param {number} casaId - ID de la casa a consultar.
 * @returns {Promise<Object|null>} Objeto con la información de la casa o null si no existe.
 * @throws {Error} Si ocurre un error en la consulta a la base de datos.
 */
export const getCasaById = async (casaId) => {
    try {
        const result = await pool.query('SELECT * FROM casas WHERE id = $1', [casaId]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

/**
 * Obtiene todas las casas asociadas a un usuario específico.
 * 
 * @function
 * @async
 * @param {number} usuarioId - ID del usuario cuyas casas se quieren consultar.
 * @returns {Promise<Array>} Array de objetos con la información de las casas del usuario.
 * @throws {Error} Si ocurre un error en la consulta a la base de datos.
 */
export const getCasasByUsuarioId = async (usuarioId) => {
    try {
        const result = await pool.query('SELECT * FROM casas WHERE usuario_id = $1', [usuarioId]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

/**
 * Obtiene todas las casas ordenadas por fecha de creación descendente.
 * 
 * @function
 * @async
 * @returns {Promise<Array>} Array de objetos con la información de las casas ordenadas por fecha.
 * @throws {Error} Si ocurre un error en la consulta a la base de datos.
 */
export const getCasasByFechaReciente = async () => {
    try {
        const result = await pool.query('SELECT * FROM casas ORDER BY fecha_creacion DESC');
        return result.rows;
    } catch (error) {
        throw error;
    }
};
