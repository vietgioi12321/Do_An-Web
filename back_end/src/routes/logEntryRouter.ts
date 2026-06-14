import express from 'express';
import { getLogEntry, addLogEntry } from '../controllers/logEntryController';

const router = express.Router();

// API POST: Thêm mới người dùng
router.get('/getLogEntryError/:userId',getLogEntry)
router.post('/add_logEntry',addLogEntry)

export default router;