import express from 'express';
import { getAssign, addAssign } from '../controllers/assignController';

const router = express.Router();

router.get('/getAssign',getAssign)
router.post('/add_assign',addAssign)

export default router;