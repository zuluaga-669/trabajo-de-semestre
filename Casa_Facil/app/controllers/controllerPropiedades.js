import Casa from '../models/Casa.js';

export const getAllCasas = async (req, res) => {
    try {
        const casas = await Casa.getAll();
        res.json(casas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las casas', error: error.message });
    }
};

export const getCasaById = async (req, res) => {
    try {
        const { id } = req.params;
        const casa = await Casa.getById(id);
        
        if (!casa) {
            return res.status(404).json({ message: 'Casa no encontrada' });
        }
        
        res.json(casa);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la casa', error: error.message });
    }
};

export const createCasa = async (req, res) => {
    try {
        const casaData = {
            ...req.body,
            usuario_id: req.user.id // Asumiendo que tienes autenticación y el usuario está en req.user
        };
        
        const nuevaCasa = await Casa.create(casaData);
        res.status(201).json(nuevaCasa);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la casa', error: error.message });
    }
};

export const updateCasa = async (req, res) => {
    try {
        const { id } = req.params;
        const casaData = req.body;
        
        const casaActualizada = await Casa.update(id, casaData);
        
        if (!casaActualizada) {
            return res.status(404).json({ message: 'Casa no encontrada' });
        }
        
        res.json(casaActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la casa', error: error.message });
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
        res.json(casas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las casas del usuario', error: error.message });
    }
}; 