import {
  crearPropiedad,
  actualizarPropiedad
} from '../models/modelPropiedades.mjs';

// Crear una propiedad
export async function crearPropiedadController(req, res) {
  try {
    const nuevaPropiedad = await crearPropiedad(req.body);
    res.status(201).json(nuevaPropiedad);
  } catch (error) {
    console.error('Error al crear propiedad:', error);
    res.status(500).json({ mensaje: 'Error al crear la propiedad' });
  }
}

// Actualizar propiedad
export async function actualizarPropiedadController(req, res) {
  const { id } = req.params;
  try {
    const propiedadActualizada = await actualizarPropiedad(id, req.body);
    res.json(propiedadActualizada);
  } catch (error) {
    console.error('Error al actualizar propiedad:', error);
    res.status(500).json({ mensaje: 'Error al actualizar la propiedad' });
  }
}
