// routes/authRoutes.js
import { Router } from 'express';
import { createOrderController, getMyOrdersController } from '../controllers/orderController.js';

const router = Router();

router.post('/new', createOrderController);
router.get('/myOrders/:iduser', getMyOrdersController);

export default router;