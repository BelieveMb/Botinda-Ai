// src/utils/auth.js

import config from "../../config";







// 🔑 Enregistrer un nouvel utilisateur
export const registerUser = async ({ fullName, phone, password }) => {
  if (!fullName || !password) {
    throw new Error("Le nom complet et le mot de passe sont requis.");
  }
  if (password.length < 6) {
    throw new Error("Le mot de passe doit avoir au moins 6 caractères.");
  }
//   if (!email && !phone) {
//     throw new Error("Veuillez fournir un email ou un numéro de téléphone.");
//   }
  if (phone && !phone.startsWith('+243')) {
    throw new Error("Le numéro doit commencer par +243 (ex: +243817723066).");
  }

  const res = await fetch(`${config}/authUser/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      full_name: fullName,
      phone: phone?.trim() || undefined,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Erreur lors de l'inscription.");
  }

  if (!data.success) {
    throw new Error(data.error || "Impossible de créer le compte.");
  }

  // ✅ Sauvegarde dans localStorage
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data.user;
};

// 🔑 Se connecter
export const loginUser = async ({ email, phone, password }) => {
  if ((!email && !phone) || !password) {
    throw new Error("Email/téléphone et mot de passe requis.");
  }

  const res = await fetch(`${API_URL}/authUser/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email?.trim() || undefined,
      phone: phone?.trim() || undefined,
      password,
    }),
  });

  if (!res.ok) {
    // Si le code de statut HTTP n'est pas OK (404, 500, etc.), on lève une erreur
    const errorText = await res.text();  // Lire la réponse en tant que texte brut
    throw new Error(errorText || "Erreur lors de l'inscription.");
  }
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Identifiants invalides.");
  }

  if (!data.success) {
    throw new Error(data.error || "Échec de la connexion.");
  }

  // ✅ Sauvegarde
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data.user;
};

// 🚪 Se déconnecter
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Tu peux ajouter ici un redirect ou un appel à navigate()
};

// 👤 Récupérer l'utilisateur actuel (depuis localStorage)
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// 🔐 Récupérer le token
export const getToken = () => {
  return localStorage.getItem('token');
};

// ✅ Vérifier si l'utilisateur est connecté
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};