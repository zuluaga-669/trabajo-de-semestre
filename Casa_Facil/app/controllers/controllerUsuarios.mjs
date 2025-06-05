import Usuario from '../models/modelUsuarios.mjs';
import Casa from '../models/modelPropiedades.mjs'

// Listar todos los usuarios
// export async function listarUsuarios(req, res) {
//     try {
//         const usuarios = await getAllUsuarios();
//         res.json(usuarios);
//     } catch (err) {
//         console.error('[ERROR] al obtener los usuarios:', err.stack);
//         res.status(500).send('Error al obtener los usuarios');
//     }
// }

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

// // Actualizar un usuario existente
// export async function actualizarUsuarioController(req, res) {
//     const usuarioId = req.params.usuarioId;
//     const { nombre, email } = req.body;

//     if (!nombre || !email) {
//         return res.status(400).json({ mensaje: 'Nombre y email son obligatorios' });
//     }

//     try {
//         const usuarioActualizado = await actualizarUsuario(usuarioId, { nombre, email });
//         res.status(200).json({
//             mensaje: 'Usuario actualizado correctamente',
//             usuario: usuarioActualizado,
//         });
//     } catch (err) {
//         console.error('[ERROR] al actualizar usuario:', err.stack);
//         res.status(500).send('Error al actualizar el usuario');
//     }
// }

// // Eliminar un usuario
// export async function eliminarUsuarioController(req, res) {
//     const usuarioId = req.params.usuarioId;

//     try {
//         const usuarioEliminado = await eliminarUsuario(usuarioId);

//         if (!usuarioEliminado) {
//             return res.status(404).json({ mensaje: 'Usuario no encontrado' });
//         }

//         res.status(200).json({ mensaje: 'Usuario eliminado', usuario: usuarioEliminado });
//     } catch (err) {
//         console.error('[ERROR] al eliminar usuario:', err.stack);
//         res.status(500).send('Error al eliminar el usuario');
//     }
// }


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
