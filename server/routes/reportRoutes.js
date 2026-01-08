// routes/authRoutes.js
import { Router } from 'express';







import { getDailyReportController } from '../controllers/reportController';
const router = Router();

router.get('/daily/:iduser', getDailyReportController);

// check dhe error on this page
export default router;