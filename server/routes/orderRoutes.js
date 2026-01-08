// routes/authRoutes.js
import { Router } from 'express';







import { createOrderController, getMyOrdersController, getInfoOrderController, updateStatutController, getOrdersbyDayController } from '../controllers/orderController.js';

const router = Router();

router.post('/new', createOrderController);
router.get('/myOrders/:iduser', getMyOrdersController);
router.get('/detail/:idorder', getInfoOrderController);
router.post('/detail/', updateStatutController);
router.get('/report/:iduser/:created_at', getOrdersbyDayController);

export default router;