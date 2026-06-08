import express from 'express';
import { getDeviceErrorStats, getErrorTimelineStats } from '../controllers/reportError';

const router = express.Router();

// API POST: Thêm mới người dùng
router.get('/getDeviceErrorStats',getDeviceErrorStats)
router.get('/getErrorTimelineStats',getErrorTimelineStats)

export default router;