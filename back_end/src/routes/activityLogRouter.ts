import express from 'express';
import { getActivityLogs,addActivitylog } from '../controllers/activityLogController';

const router = express.Router();

// Tuyến đường xử lý Đăng nhập
router.get('/getActivityLog/:userId', getActivityLogs);
router.post('/addActivityLog',addActivitylog)

export default router;