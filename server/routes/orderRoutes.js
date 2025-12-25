// routes/authRoutes.js
import { Router } from 'express';
import { createOrderController, getMyOrdersController, getInfoOrderController } from '../controllers/orderController.js';

const router = Router();

router.post('/new', createOrderController);
router.get('/myOrders/:iduser', getMyOrdersController);
router.get('/detail/:idorder', getInfoOrderController);

export default router;