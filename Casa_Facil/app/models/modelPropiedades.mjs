import pool from '../../db/pool.mjs';

class Casa {
    // Obtener todas las casas
    static async getAll() {
        const query = 'SELECT * FROM registro_casas ORDER BY casa_id DESC';
        const { rows } = await pool.query(query);
        return rows;
    }

    // Obtener casas por usuario_id
    static async getByUserId(usuario_id) {
        const query = 'SELECT * FROM registro_casas WHERE usuario_id = $1 ORDER BY casa_id DESC';
        const { rows } = await pool.query(query, [usuario_id]);
        return rows;
    }

    // Crear nueva casa
    static async create(
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
    ) {
        const query = `
            INSERT INTO registro_casas (
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

        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    // Actualizar una casa
    static async update(casa_id, casaData) {
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
            UPDATE registro_casas
            SET usuario_id = $1,
                plan_id = $2,
                tipo_vivienda = $3,
                numero_banos = $4,
                numero_cuartos = $5,
                mascotas = $6,
                ubicacion = $7,
                observaciones = $8,
                cantidad_personas = $9,
                imagenes = $10
            WHERE casa_id = $11
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
            imagenes,
            casa_id
        ];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    // Eliminar una casa
    static async delete(casa_id) {
        const query = 'DELETE FROM registro_casas WHERE casa_id = $1 RETURNING *';
        const { rows } = await pool.query(query, [casa_id]);
        return rows[0];
    }
}

export default Casa;