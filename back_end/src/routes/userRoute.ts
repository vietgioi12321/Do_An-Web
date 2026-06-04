import express from 'express';
import { loginController } from '../controllers/userController';

const router = express.Router();

// Tuyến đường xử lý Đăng nhập
router.post('/login', loginController);

export default router;