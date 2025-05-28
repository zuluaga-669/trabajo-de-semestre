import { pool } from '../config/database.js';

class Casa {
    static async getAll() {
        try {
            const query = `
                SELECT rc.*, ru.nombre as propietario_nombre, p.nombre as plan_nombre 
                FROM registro_casas rc
                JOIN registro_usuarios ru ON rc.usuario_id = ru.usuario_id
                JOIN planes p ON rc.plan_id = p.plan_id
            `;
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const query = `
                SELECT rc.*, ru.nombre as propietario_nombre, p.nombre as plan_nombre 
                FROM registro_casas rc
                JOIN registro_usuarios ru ON rc.usuario_id = ru.usuario_id
                JOIN planes p ON rc.plan_id = p.plan_id
                WHERE rc.casa_id = $1
            `;
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(casaData) {
        try {
            const {
                usuario_id,
                plan_id,
                tipo_vivienda,
                numero_banos,
                numero_cuartos,
                mascotas,
                ubicacion,
                observaciones,
                cantidad_personas,
                imagenes
            } = casaData;

            const query = `
                INSERT INTO registro_casas (
                    usuario_id, plan_id, tipo_vivienda, numero_banos,
                    numero_cuartos, mascotas, ubicacion, observaciones,
                    cantidad_personas, imagenes
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING *
            `;

            const values = [
                usuario_id,
                plan_id,
                tipo_vivienda,
                numero_banos,
                numero_cuartos,
                mascotas,
                ubicacion,
                observaciones,
                cantidad_personas,
                imagenes
            ];

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id, casaData) {
        try {
            const {
                plan_id,
                tipo_vivienda,
                numero_banos,
                numero_cuartos,
                mascotas,
                ubicacion,
                observaciones,
                cantidad_personas,
                imagenes
            } = casaData;

            const query = `
                UPDATE registro_casas
                SET plan_id = $1,
                    tipo_vivienda = $2,
                    numero_banos = $3,
                    numero_cuartos = $4,
                    mascotas = $5,
                    ubicacion = $6,
                    observaciones = $7,
                    cantidad_personas = $8,
                    imagenes = $9
                WHERE casa_id = $10
                RETURNING *
            `;

            const values = [
                plan_id,
                tipo_vivienda,
                numero_banos,
                numero_cuartos,
                mascotas,
                ubicacion,
                observaciones,
                cantidad_personas,
                imagenes,
                id
            ];

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const query = 'DELETE FROM registro_casas WHERE casa_id = $1 RETURNING *';
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async getByUserId(usuario_id) {
        try {
            const query = `
                SELECT rc.*, p.nombre as plan_nombre 
                FROM registro_casas rc
                JOIN planes p ON rc.plan_id = p.plan_id
                WHERE rc.usuario_id = $1
            `;
            const result = await pool.query(query, [usuario_id]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

export default Casa; 