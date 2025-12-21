// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../config/connexionDB.js';
// import { sendVerificationSMS } from '../utils/twilio.js';

// 🔑 Générateur de JWTs
const generateToken = (userId) => {
  return jwt.sign({ iduser: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 📲 Inscription
export const register = async (req, res) => {
  const { full_name, phone, password } = req.body;

  // 1. Validation
  if (!full_name || !phone || !password) {
    return res.status(400).json({ error: "Nom, mot de passe et téléphone sont requis." });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Le mot de passe doit avoir au moins 6 caractères." });
  }

  try {
    // 2. Vérifier si utilisateur existe 
    let {  existing, error } = await supabase
      .from('users')
      .select('iduser')
      .or(`phone.eq.${phone}`)
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
      .insert([{ full_name, phone, password: hashedPassword }])
      .select('iduser, full_name, phone')
      .single();

    if (insertError) throw insertError;

    /* 5. Optionnel : envoyer SMS de bienvenue
    if (phone) {
      try {
        await sendVerificationSMS(phone, `👋 Bienvenue ${full_name} ! Votre compte BoTinda AI est créé.`);
      } catch (smsError) {
        console.warn("Erreur envoi SMS:", smsError.message);
      }
    }*/

    // 6. Générer JWT
    const token = generateToken(user.id);

    // return res.status(201).json({
    //   success: true,
    //   token,
    //   user: { iduser: user.iduser, full_name: user.full_name, phone: user.phone },
    //   message: "Vous êtes enregistré, connectez-vous !"
    // });
      res
        .status(200)
        .json({ message: "Utilisateur enregistré avec succès", iduser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur. Réessayez plus tard." });
  }
};

// 🔑 Connexion
export const login2 = async (req, res) => {
  const { phone, password } = req.body;

  if ((  !phone) || !password) {
    return res.status(400).json({ error: "Téléphone et mot de passe requis." });
  }

  try {
    // 1. Trouver utilisateur
    const {  user, error } = await supabase
      .from('users')
      .select('iduser, full_name, email, phone, password')
      .or(`phone.eq.${phone}`)
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
    const token = generateToken(user.iduser);

    res.json({
      success: true,
      token,
      user: { id: user.iduser, full_name: user.full_name, email: user.email, phone: user.phone }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};

// 🔑 Connexion
export const login = async (req, res) => {
const { phone, password } = req.body;
  let response = { status: 200, data: null, error: null };
  
  // ✅ Validation des entrées
  if (!phone || !password ) {
    response.status = 400;
    response.error = "Le numéro  de téléphone et le mot de passe sont requis.";
    return response;    
  }

  try {
      // 🔍 Rechercher l'utilisateur dans Supabase
      const { data, error: supabaseError } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .limit(1);
      
    if (supabaseError) {
      console.error("Erreur Supabase :", supabaseError);
      return res.status(500).json({ error: "Erreur interne du serveur." });
    }

    if (data.length === 0) {
      response.status = 401;
      response.error = "Utilisateur non trouvé";
      return response;
    }

    const user = data[0];
    
    // 🔐 Vérifier le mot de passe
    if (!user.password) {
      response.status = 500;
      response.error = "Erreur interne : mot de passe manquant."
      return response;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      response.status = 401;
      response.error = "Numéro de téléphone ou mot de passe incorrect.";
      return response;
    }
   
    // 🎫 Générer le token JWT
    const token = jwt.sign(
      { id: user.iduser },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ Réponse de succès
    response.status = 200;
    response.data = { token, iduser: user.iduser,message: "Connexion réussie."};
    return response;

  } catch (error) {
    console.error("Erreur inattendue dans loginUser :", error);
    response.status = 500;
    response.error = "Une erreur inattendue est survenue. Veuillez réessayer plus tard.";
    return response;
  }
}

export const getInfoUser = async (req, res) => {
  const { iduser } = req.params;
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("iduser", iduser)
    .single();
  if (error) throw error;
  return data;
};