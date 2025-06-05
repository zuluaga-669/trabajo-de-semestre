import express from 'express';
import { getAllCasas,createCasa, updateCasa,deleteCasa,getCasasByUserId} from '../controllers/controllerPropiedades.mjs';

const router = express.Router();

router.get('/', getAllCasas);

router.post('/registroCasas', createCasa);

router.put('/:id', updateCasa);

router.delete('/:id', deleteCasa);

export default router; 