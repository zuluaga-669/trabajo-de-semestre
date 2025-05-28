import pool from '../../db/pool.mjs';

// Crear nueva propiedad
export async function crearPropiedad(propiedad) {
  const {
    titulo,
    descripcion,
    precio,
    tipo_operacion,
    tipo_propiedad,
    direccion,
    ciudad,
    departamento,
    area_total,
    habitaciones,
    banos,
    permite_mascotas = false,
    personas_permitidas,
    id_propietario
  } = propiedad;

  const result = await pool.query(`
    INSERT INTO propiedades (
      titulo, descripcion, precio, tipo_operacion, tipo_propiedad,
      direccion, ciudad, departamento, area_total, habitaciones, banos,
      permite_mascotas, personas_permitidas, id_propietario
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10, $11,
      $12, $13, $14
    ) RETURNING *;
  `, [
    titulo, descripcion, precio, tipo_operacion.toUpperCase(), tipo_propiedad,
    direccion, ciudad, departamento, area_total, habitaciones, banos,
    permite_mascotas, personas_permitidas, id_propietario
  ]);

  return result.rows[0];
}

// Actualizar propiedad existente
export async function actualizarPropiedad(id, propiedad) {
  const {
    titulo,
    descripcion,
    precio,
    tipo_operacion,
    tipo_propiedad,
    direccion,
    ciudad,
    departamento,
    area_total,
    habitaciones,
    banos,
    permite_mascotas,
    personas_permitidas,
    estado
  } = propiedad;

  const result = await pool.query(`
    UPDATE propiedades SET
      titulo = $1,
      descripcion = $2,
      precio = $3,
      tipo_operacion = $4,
      tipo_propiedad = $5,
      direccion = $6,
      ciudad = $7,
      departamento = $8,
      area_total = $9,
      habitaciones = $10,
      banos = $11,
      permite_mascotas = $12,
      personas_permitidas = $13,
      estado = $14
    WHERE id = $15
    RETURNING *;
  `, [
    titulo, descripcion, precio, tipo_operacion, tipo_propiedad,
    direccion, ciudad, departamento, area_total, habitaciones,
    banos, permite_mascotas, personas_permitidas, estado, id
  ]);

  return result.rows[0];
}
