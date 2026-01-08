// routes/authRoutes.js
import { Router } from 'express';







import { createOrderController, getMyOrdersController, getInfoOrderController, updateStatutController } from '../controllers/orderController.js';

const router = Router();

router.post('/new', createOrderController);
router.get('/myOrders/:iduser', getMyOrdersController);
router.get('/detail/:idorder', getInfoOrderController);
router.post('/detail/', updateStatutController);
router.get('/report/:iduser/:created_at', getMyOrdersController);

export default router;