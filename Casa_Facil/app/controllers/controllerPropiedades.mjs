import Casa from '../models/modelPropiedades.mjs';

export const createCasa = async (req, res) => {
    try {
        const {
            usuid, tipo, banos, habitaciones,
            mascotas, ubicacion, descripcion,
            personasPermitidas, precio, titulo
        } = req.body;

        // req.files es un array con info de imágenes subidas (multer)
        const rutasImagenes = req.files.map(file => file.filename); // solo nombres de archivos

        // Guardamos rutas como JSON string en la DB
        const imagenesJson = JSON.stringify(rutasImagenes);

        const nuevaCasa = await Casa.create(
            usuid, tipo, banos, habitaciones, mascotas,
            ubicacion, descripcion, personasPermitidas, precio, titulo, imagenesJson
        );

        // parseamos las imágenes para enviar array a frontend
        nuevaCasa.imagenes = rutasImagenes; // aseguramos que venga como array

        res.status(201).json(nuevaCasa);
        console.log('Casa creada:', nuevaCasa);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la casa', error: error.message });
    }
};


export const deleteCasa = async (req, res) => {
    try {
        const { id } = req.params;
        const casaEliminada = await Casa.delete(id);

        if (!casaEliminada) {
            return res.status(404).json({ message: 'Casa no encontrada' });
        }

        res.json({ message: 'Casa eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la casa', error: error.message });
    }
};

export const getCasasByUserId = async (req, res) => {
    try {
        const { usuario_id } = req.params;
        const casas = await Casa.getByUserId(usuario_id);

        const casasConImagenes = casas.map(casa => ({
            ...casa,
            imagen: casa.imagen ? casa.imagen.toString('base64') : null
        }));

        res.json(casasConImagenes);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener las casas del usuario',
            error: error.message
        });
    }
};


export const getAllCasas = async (req, res) => {
    try {
        const propiedades = await Casa.InfoTodasCasas();

        res.status(200).json({ propiedades });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener datos', error: error.message });
    }
};
