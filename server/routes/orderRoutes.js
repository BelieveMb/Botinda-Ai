// routes/authRoutes.js
import { Router } from 'express';
import { createOrderController } from '../controllers/orderController.js';

const router = Router();

router.post('/new', createOrderController);

export default router;