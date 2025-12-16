// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthButton from '../components/smallComponents/AuthButton';
import PhoneInput from '../components/smallComponents/PhoneInput';
import InputBox from '../components/ui/InputBox';
import axios from 'axios';
import { registerUser } from '../utils/auth';
import config from '../../config';

const Register = () => {
  const [full_name, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleSignup = async () => {
  //   if (!fullname || !phone || !password) {
  //     alert("Tous les champs doivent être remplis.");
  //     return; 
  //   }
  //   // Vérifications des champs
  //   if (!fullname || fullname.length > 30) {
  //     alert(
  //       "Le nom complet doit être renseigné et ne pas dépasser 30 caractères."
  //     );
  //     return;
  //   }

  //   const phoneRegex = /^[0-9]{10,15}$/;
  //   // if (!phone || !phoneRegex.test(phone)) {
  //   //   alert("Le numéro de téléphone doit être entre 10 et 15 chiffres.");
  //   //   return;
  //   // }

  //   if (!password || password.length < 6 || password.length > 14) {
  //     alert("Le mot de passe doit être compris entre 6 et 14 caractères.");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(`${config.apiUrl}/authUser/register`, {
  //       fullname,
  //       phone,
  //       password,
  //     });
      
  //     alert("Succès", "Vous êtes enregistres, connectez vous !");
  //     navigate('/verify-code'); // ou directement dashboard si pas de SMS
  //     console.log('Inscription avec:', { phone, password });
  //     setFullname("");
  //     setPhone("");
  //     setPassword("");
  //   } catch (error) {
  //     alert("Erreur lors de l'enregistrement.", error.message);
  //     console.log(error);
  //   }
  // };

  const fullNameChange = (e) => {
    setFullname(e.target.value);  // Mettre à jour l'état avec la nouvelle valeur
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {

    // Envoi de la requête POST
    const response = await axios.post(`http://172.20.10.14:5000/authUser/register`, {
      full_name,      phone, password,
    });

    // Vérifier si la réponse est bien au format attendu
    if (response && response.data) {
      const data = response.data;

      // Vérifier si le serveur renvoie une réponse de succès
      if (data.success) {
        alert("Succès", "Vous êtes enregistré, connectez-vous !");
        console.log("Utilisateur enregistré avec succès:", data);
      } else {
        // Si l'API retourne une erreur (par exemple un champ invalide)
        alert("Erreur", data.error || "Une erreur inconnue est survenue.");
        console.error("Erreur lors de l'inscription:", data.error);
      }
    } else {
      // Si la réponse est vide ou mal formée
      throw new Error('La réponse du serveur est vide ou mal formée.');
    }
  } catch (err) {
    // Gestion des erreurs réseau ou autres erreurs
    setError(err.message || "Une erreur est survenue lors de l'enregistrement.");
    alert("Erreur lors de l'enregistrement.", err.message || "Erreur inconnue.");
    console.error("Erreur:", err);
  } finally {
    // Désactivation de l'état de chargement
    setLoading(false);
  }

  };
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between content-start gap-8  w-full lg:px-8">
        <img src="/logo.png" alt="BoTinda AI" className="h-12 w-24" />
        <p className="text-sm text-gray-500 mt-1">
          Déjà membre ? <span className="text-primary cursor-pointer" onClick={() => navigate('/login')}>Se connecter</span>
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</div>}          
       
        <h1 className="text-2xl font-poppins font-semibold text-primary mb-4">S'inscrire</h1>
        <p className="text-gray-600 mb-6">Connectez-vous avec</p>

        {/* Social Buttons */}
        <AuthButton provider="google">Google</AuthButton>
        <AuthButton provider="apple">Apple ID</AuthButton>

        <div className="my-4 text-center text-gray-400">— Ou continuez avec votre numéro —</div>

        
        <div className="relative my-6">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">👤</span>
          <input
            type="text"
            name={"full_name"}
            // value={fullName}
            onChange={fullNameChange}
            placeholder={"Ex. David Okit"}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-blue-500 text-blue-800 font-bold"
          />
        </div>
        {/* Phone Input */}
        <PhoneInput value={phone} name={phone} onChange={setPhone} />


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
          disabled={!phone || !password}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium transition ${
            phone && password ? 'bg-blue-600 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-4">
          This site is protected by reCAPTCHA and the Google Privacy Policy.
        </p>
       </form>
      </div>
    </div>
  );
};

export default Register;