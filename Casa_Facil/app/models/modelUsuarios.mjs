import pool from '../../db/pool.mjs';

class Usuario {
    // static async getByEmail(email) {
    //     const query = 'SELECT * FROM usuarios WHERE email = $1';
    //     const { rows } = await pool.query(query, [email]);
    //     return rows[0];
    // }

    // static async create(userData) {
    //     const { nombre, email, password, telefono } = userData;
    //     const query = `
    //         INSERT INTO usuarios (nombre, email, password, telefono)
    //         VALUES ($1, $2, $3, $4)
    //         RETURNING id, nombre, email, telefono
    //     `;
    //     const values = [nombre, email, password, telefono];
    //     const { rows } = await pool.query(query, values);
    //     return rows[0];
    // }

    // static async update(id, userData) {
    //     const { nombre, telefono } = userData;
    //     const query = `
    //         UPDATE usuarios
    //         SET nombre = $1, telefono = $2, actualizado_en = CURRENT_TIMESTAMP
    //         WHERE id = $3
    //         RETURNING id, nombre, email, telefono
    //     `;
    //     const values = [nombre, telefono, id];
    //     const { rows } = await pool.query(query, values);
    //     return rows[0];
    // }

    // static async delete(id) {
    //     const query = 'DELETE FROM usuarios WHERE id = $1 RETURNING *';
    //     const { rows } = await pool.query(query, [id]);
    //     return rows[0];
    // }

    static async buscarUsarios(correo, pass) {
        const query = 'SELECT * FROM usuarios WHERE correo = $1 AND pass = $2';
        const { rows } = await pool.query(query, [correo, pass]);
        return rows[0]; 
    }


    static async cargarInfo(usuid){
        const query = 'SELECT nombre,celular,correo FROM usuarios where usuid = $1';
        const {rows} = await pool.query(query, [usuid]);
        return rows[0]; 
    }
}

export default Usuario; 