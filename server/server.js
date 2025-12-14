// server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import supabase from "./config/connexionDB.js"
dotenv.config();

const app = express();

// Middlewares
app.use(helmet()); // Sécurité HTTP
app.use(cors({ origin: 'http://localhost:5173' })); // À adapter avec ton frontend
app.use(morgan('dev'));
app.use(express.json());


app.get("/statut", async (req, res) => {


  // Logique pour récupérer les informations de l'utilisateur à partir de l'I
  const { data, error } = await supabase
    .from("statuses")
    .select();
    console.log("Sta = ", data);

    
});

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend BoTinda AI opérationnel 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});