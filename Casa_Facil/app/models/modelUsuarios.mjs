import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'casa_facil',
    password: '1002542140', // Deberás cambiar esto por tu contraseña
    port: 5432,
});

// Función para obtener todos los usuarios
export async function getAllUsers() {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        return result.rows;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

// Función para obtener un usuario por ID
export async function getUserById(id) {
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw error;
    }
}

// Función para crear un nuevo usuario
export async function createUser(userData) {
    const {
        nombre,
        apellidos,
        tipo_documento,
        numero_documento,
        correo,
        celular,
        direccion,
        departamento,
        municipio,
        categoria,
        tipo_persona,
        password
    } = userData;

    try {
        const result = await pool.query(
            `INSERT INTO usuarios (
                nombre,
                apellidos,
                tipo_documento,
                numero_documento,
                correo,
                celular,
                direccion,
                departamento,
                municipio,
                fecha_registro,
                estado,
                categoria,
                tipo_persona,
                password
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP, 'ACTIVO', $10, $11, $12) 
            RETURNING *`,
            [
                nombre,
                apellidos,
                tipo_documento.toUpperCase(),
                numero_documento,
                correo,
                celular,
                direccion,
                departamento,
                municipio,
                categoria.toUpperCase(),
                tipo_persona.toUpperCase(),
                password
            ]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}

// Función para actualizar un usuario
export async function updateUser(id, userData) {
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    // Construir la consulta dinámicamente basada en los campos proporcionados
    Object.keys(userData).forEach(key => {
        if (userData[key] !== undefined) {
            updateFields.push(`${key} = $${paramCount}`);
            values.push(userData[key]);
            paramCount++;
        }
    });

    values.push(id); // Añadir el ID al final del array de valores

    try {
        const result = await pool.query(
            `UPDATE usuarios 
             SET ${updateFields.join(', ')} 
             WHERE id = $${paramCount} 
             RETURNING *`,
            values
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
}

// Función para eliminar un usuario
export async function deleteUser(id) {
    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING id', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
}

// Script para crear la tabla si no existe
export async function initializeDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                apellidos VARCHAR(100) NOT NULL,
                tipo_documento VARCHAR(20) NOT NULL,
                numero_documento VARCHAR(20) UNIQUE NOT NULL,
                correo VARCHAR(100) UNIQUE NOT NULL,
                celular VARCHAR(15) NOT NULL,
                direccion TEXT NOT NULL,
                departamento VARCHAR(50) NOT NULL,
                municipio VARCHAR(50) NOT NULL,
                fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                estado VARCHAR(20) DEFAULT 'ACTIVO',
                categoria VARCHAR(20) NOT NULL,
                tipo_persona VARCHAR(20) NOT NULL,
                password TEXT NOT NULL
            );
        `);
        console.log('Base de datos inicializada correctamente');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        throw error;
    }
}
