import pool from '../../db/pool.mjs';

class Casa {
    static async infoCasas() {
        const query = 'SELECT * FROM casas ORDER BY 1 DESC';
        const { rows } = await pool.query(query);
        return rows;
    }

    static async getCasasByUserId(id) {
        const query = 'SELECT * FROM casas WHERE usuid = $1';
        const { rows } = await pool.query(query, [id]);
        return rows;
    }

    static async create(
        usuid, tipo, banos, habitaciones, mascotas,
        ubicacion, descripcion, personasPermitidas, precio, titulo, imagenesJson
    ) {
        const query = `
            INSERT INTO casas (
                usuid, tipoVivienda, nbanos, ncuartos, mascotas,
                direccion, observaciones, cantidadPersonas, precio, titulo, imagenes
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *
        `;

        const values = [
            usuid, tipo, banos, habitaciones, mascotas,
            ubicacion, descripcion, personasPermitidas, precio, titulo, imagenesJson
        ];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }



    static async update(id, casaData) {
        const {
            titulo,
            descripcion,
            precio,
            ubicacion,
            tipo,
            habitaciones,
            banos,
            imagen_url
        } = casaData;

        const query = `
            UPDATE casas
            SET titulo = $1, descripcion = $2, precio = $3,
                ubicacion = $4, tipo = $5, habitaciones = $6,
                banos = $7, imagen_url = $8,
                actualizado_en = CURRENT_TIMESTAMP
            WHERE id = $9
            RETURNING *
        `;

        const values = [
            titulo,
            descripcion,
            precio,
            ubicacion,
            tipo,
            habitaciones,
            banos,
            imagen_url,
            id
        ];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM casas WHERE id = $1 RETURNING *';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    static async getByUserId(usuario_id) {
        const query = 'SELECT * FROM casas WHERE usuario_id = $1 ORDER BY id DESC';
        const { rows } = await pool.query(query, [usuario_id]);
        return rows;
    }

    static async InfoTodasCasas() {
        const query = 'SELECT * FROM casas  ORDER BY 1 DESC';
        const { rows } = await pool.query(query);
        return rows;
    }
}

export default Casa;



