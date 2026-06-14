import express from 'express';
import { getAssign, addAssign,updateAssign } from '../controllers/assignController';

const router = express.Router();

router.get('/getAssign',getAssign)
router.post('/add_assign',addAssign)
router.put('/update_assign', updateAssign);

export default router;