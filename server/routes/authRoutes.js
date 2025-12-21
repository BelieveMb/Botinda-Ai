// routes/authRoutes.js
import { Router } from 'express';
import { registerController, loginController, getUserController } from '../controllers/authController.js';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/userInfo/:iduser', getUserController);



export default router;