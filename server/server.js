// server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
// import reportRoutes from './routes/reportRoutes.js'

dotenv.config();

const app = express();

// Middlewares
app.use(helmet()); // Sécurité HTTP
app.use(cors({ origin: 'http://localhost:5173' })); // À adapter avec ton frontend
app.use(morgan('dev'));
app.use(express.json());

app.use("/authUser", authRoutes);
app.use("/order", orderRoutes);

const getDailyReport = async (req, res) => {
  const { iduser, dateReport } = req.params;
  const { data, error } = await supabase
    .from("reports")
    .select()
    .eq("user_id", iduser)
    .eq("date", dateReport)
    .single();
  if (error) throw error;
  return data;
}
app.use("/report/daily", getDailyReport);


// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend BoTinda AI opérationnel 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});