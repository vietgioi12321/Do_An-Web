import express from 'express';
import { getDevices, addDevice } from '../controllers/deviceController';

const router = express.Router();

router.get('/getDevice/:userID',getDevices)
router.post('/add_device',addDevice)

export default router;