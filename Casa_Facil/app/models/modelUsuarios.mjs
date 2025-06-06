import pool from '../../db/pool.mjs';

class Usuario {

  static async create(userData) {
    const {
      nombre,
      apellidos,
      tipo_documento,
      numero_documento,
      correo,
      celular,
      departamento,
      municipio,
      estado,
      contrasena,
      tipo_persona
    } = userData;

    const query = `
    INSERT INTO usuarios (    
    nombre,
    apellidos,
    tipo_documento,
    numero_documento,
    correo,       
    celular,    
    departamento,
    municipio,
    estado,
    pass,
    tipo_persona)
    VALUES ($1, $2, $3, $4 ,$5, $6, $7, $8, $9, $10, $11)
    RETURNING usuid, nombre, correo, celular
  `;
    const values = [nombre,
      apellidos,
      tipo_documento,
      numero_documento,
      correo,
      celular,
      departamento,
      municipio,
      estado,
      contrasena,
      tipo_persona];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async buscarUsarios(correo, pass) {
    const query = 'SELECT * FROM usuarios WHERE correo = $1 AND pass = $2';
    const { rows } = await pool.query(query, [correo, pass]);
    return rows[0];
  }


  static async cargarInfo(usuid) {
    const query = 'SELECT nombre,celular,correo FROM usuarios where usuid = $1';
    const { rows } = await pool.query(query, [usuid]);
    return rows[0];
  }

  static async infoUsuarios() {
    const query = 'SELECT * FROM usuarios ORDER BY usuid DESC';
    const { rows } = await pool.query(query);
    return rows;
  }
}

export default Usuario; 