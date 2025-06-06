import Usuario from '../models/modelUsuarios.mjs';
import Casa from '../models/modelPropiedades.mjs'

// Crear un nuevo usuario
export async function guardarUsuario(req, res) {
  const datos = req.body;

  try {
    const nuevoUsuario = await Usuario.create(datos);
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      usuario: nuevoUsuario,
    });
  } catch (err) {
    console.error('[ERROR] al crear usuario:', err.stack);
    res.status(500).json({ message: 'Error al guardar el usuario' });
  }
}

export async function buscarUsuario(req, res) {
  const { correo, pass } = req.body;

  try {
    const usuario = await Usuario.buscarUsarios(correo, pass);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);

  } catch (err) {
    console.error('[ERROR] usuario no encontrado:', err.stack);
    res.status(500).send('Error al buscar el usuario');
  }
}

export const vistaUsuario = async (req, res) => {
  try {
    const { usuid } = req.body;

    const usuario = await Usuario.cargarInfo(usuid); // datos del usuario
    const propiedades = await Casa.getCasasByUserId(usuid); // propiedades del usuario

    res.status(200).json({ usuario, propiedades });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener datos del usuario', error: error.message });
  }
};


export const getAllData = async (req, res) => {
  try {
    const usuarios = await Usuario.infoUsuarios();
    const propiedades = await Casa.infoCasas();

    res.status(200).json({ usuarios, propiedades });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener datos', error: error.message });
  }
};