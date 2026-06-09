import express from 'express';
import {postChatBotLog} from '../controllers/chatBotController'
import { getChatBotLog } from '../controllers/chatBotLogController';

const router = express.Router();

router.post('/postChatBotLog', postChatBotLog)
router.get('/getChatBotLog/:userId',getChatBotLog)
// router.post('/add_chatbotlog',add_ChatBotLog)

export default router;