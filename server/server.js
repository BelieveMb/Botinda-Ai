// server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js"
dotenv.config();

const app = express();

// Middlewares
app.use(helmet()); // Sécurité HTTP
app.use(cors({ origin: 'http://localhost:5173' })); // À adapter avec ton frontend
app.use(morgan('dev'));
app.use(express.json());

app.use("/authUser", authRoutes);


// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend BoTinda AI opérationnel 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});