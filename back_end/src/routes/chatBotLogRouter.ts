import express from 'express';
import {getChatBotLog,add_ChatBotLog} from '../controllers/chatBotLogController' // Trỏ đúng về file Model User đã sửa sạch lỗi ở bước trước

const router = express.Router();

router.get('/getChatBotLog/:userId', getChatBotLog)
router.post('/add_chatbotlog',add_ChatBotLog)

export default router;