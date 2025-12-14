// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../config/connexionDB.js';
import { sendVerificationSMS } from '../utils/twilio.js';

// 🔑 Générateur de JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 📲 Inscription a
export const register = async (req, res) => {
  const { full_name, email, phone, password } = req.body;

  // 1. Validation
  if (!full_name || (!email && !phone) || !password) {
    return res.status(400).json({ error: "Nom, mot de passe et (email ou téléphone) requis." });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Le mot de passe doit avoir au moins 6 caractères." });
  }

  try {
    // 2. Vérifier si utilisateur existe déjà
    let {  existing, error } = await supabase
      .from('users')
      .select('id')
      .or(`email.eq.${email},phone.eq.${phone}`)
      .maybeSingle();

    if (existing) {
      return res.status(400).json({ error: "Un compte existe déjà avec ces identifiants." });
    }

    // 3. Hash mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Insérer utilisateur
    const {  user, error: insertError } = await supabase
      .from('users')
      .insert([{ full_name, email, phone, password: hashedPassword }])
      .select('id, full_name, email, phone')
      .single();

    if (insertError) throw insertError;

    // 5. Optionnel : envoyer SMS de bienvenue
    if (phone) {
      try {
        await sendVerificationSMS(phone, `👋 Bienvenue ${full_name} ! Votre compte BoTinda AI est créé.`);
      } catch (smsError) {
        console.warn("Erreur envoi SMS:", smsError.message);
      }
    }

    // 6. Générer JWT
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      token,
      user: { id: user.id, full_name: user.full_name, email: user.email, phone: user.phone }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur. Réessayez plus tard." });
  }
};

// 🔑 Connexion
export const login = async (req, res) => {
  const { email, phone, password } = req.body;

  if ((!email && !phone) || !password) {
    return res.status(400).json({ error: "Email/téléphone et mot de passe requis." });
  }

  try {
    // 1. Trouver utilisateur
    const {  user, error } = await supabase
      .from('users')
      .select('id, full_name, email, phone, password')
      .or(`email.eq.${email},phone.eq.${phone}`)
      .maybeSingle();

    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }

    // 2. Vérifier mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }

    // 3. Générer JWT
    const token = generateToken(user.id);

    res.json({
      success: true,
      token,
      user: { id: user.id, full_name: user.full_name, email: user.email, phone: user.phone }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};