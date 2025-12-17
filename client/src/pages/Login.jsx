// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthButton from '../components/smallComponents/AuthButton';
import PhoneInput from '../components/smallComponents/PhoneInput';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../../config';


const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();   

  const handleLoginWithPhone = async () => {
    
    // Ici tu appellerais Supabase pour envoyer le code SMS
    console.log('Envoi code à:', phone);
    navigate('/verify-code');
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);
  
  try {
    // Validation des champs requis
    if (!phone || !password) {
      throw new Error("Le numéro de téléphone et le mot de passe sont requis.");
    }
    
    // Envoi de la requête POST pour enregistrer l'utilisateur
    const response = await axios.post(`${config.apiUrl}/authUser/login`, {phone, password});
    console.log("hello world");

      // if (response.data.status === 200) {
    console.log(response.data);
    
    // Vérification de la réponse de l'API (en fonction de la structure de réponse de l'API)
    if (response.data && response.data.success) {
      // Afficher l'alerte de succès avec SweetAlert2
      await Swal.fire({
        icon: 'success',
        title: 'Succès!',
        text: 'Vous êtes authentifé, connectez-vous !',
      });

      // Rediriger l'utilisateur vers la page de login
      navigate('/dashboard');
    } else {
      // Si l'API renvoie une erreur (par exemple un champ invalide)
      throw new Error(response.data.error || "Une erreur inconnue est survenue.");
    }

  } catch (error) {
    // Gestion des erreurs et affichage d'un message d'erreur
    setError(error.message || "Une erreur est survenue lors de l'enregistrement.");
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: error.message || "Une erreur inconnue est survenue.",
    });
    console.error("Erreur lors de la connexion:", error);
  } finally {
    // Désactivation de l'état de chargement
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-between pb-20 px-6 ">
      {/* Header */}
      <div className="my-8 flex items-start justify-between gap-8  w-full ">
        <img src="../../public/logo.png" alt="BoTinda AI" className="w-24 h-12 border border-red-500 " />
        <p className="text-12 text-blue-900 mt-1">
          Pas de compte ? <span className="text-primary cursor-pointer font-bold " onClick={() => navigate('/signup')}>S'inscrire</span>
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-16">
        <form>
        <h1 className="text-2xl font-poppins font-semibold text-primary mb-4">Connexion</h1>
        <p className="text-gray-600 mb-6">Connectez-vous avec</p>

        {/* Social Buttons */}
        <AuthButton provider="google">Google</AuthButton>
        <AuthButton provider="apple">Apple ID</AuthButton>

        <div className="my-4 text-center text-gray-400">— Ou continuez avec votre numéro —</div>

        {/* Phone Input */}
        <PhoneInput value={phone} onChange={setPhone} />
         {/* Password Input */}
        <div className="relative my-4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">🔒</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 text-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-bold bg-gray-100"
          />
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          disabled={!phone && !password}
          className={`w-full py-2 border border-blue-400 text-gray-600 px-4 rounded-lg font-medium transition ${
            phone ? 'bg-primary hover:bg-blue-800 hover:text-gray-50' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-4">This site is protected by reCAPTCHA and the Google Privacy Policy.</p>
        </form>
      </div>
    </div>
  );
};

export default Login;