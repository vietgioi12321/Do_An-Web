import express from 'express';
import { loginController } from '../controllers/userController';
import {recoverPasswordController} from '../controllers/recoverPasswordController';
import {changePasswordController} from '../controllers/changePassword';

const router = express.Router();

// Tuyến đường xử lý Đăng nhập
router.post('/login', loginController);
router.post('/recoverPassword',recoverPasswordController)
router.post('/changePassword',changePasswordController)

export default router;