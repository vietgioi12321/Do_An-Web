import express from 'express';
import { getDeviceErrorStats, getErrorTimelineStats } from '../controllers/overviewController';

const router = express.Router();

router.get('/getDeviceErrorStats/:userId', getDeviceErrorStats);
router.get('/getErrorTimelineStats/:userId', getErrorTimelineStats);

export default router;
