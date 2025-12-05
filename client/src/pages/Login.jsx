// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthButton from '../components/smallComponents/AuthButton';
import PhoneInput from '../components/smallComponents/PhoneInput';


const Login = () => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();   

  const handleLoginWithPhone = async () => {
    // Ici tu appellerais Supabase pour envoyer le code SMS
    console.log('Envoi code à:', phone);
    navigate('/verify-code');
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-between pb-20 px-6 ">
      {/* Header */}
      <div className="my-8 flex items-start justify-between gap-8  w-full ">
        <img src="../assets/logo-main.png" alt="BoTinda AI" className="border border-indigo-400 h-12 " />
        <p className="text-12 text-blue-900 mt-1">
          Pas de compte ? <span className="text-primary cursor-pointer font-bold " onClick={() => navigate('/signup')}>S'inscrire</span>
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-16">
        <h1 className="text-2xl font-poppins font-semibold text-primary mb-4">Connexion</h1>
        <p className="text-gray-600 mb-6">Connectez-vous avec</p>

        {/* Social Buttons */}
        <AuthButton provider="google">Google</AuthButton>
        <AuthButton provider="apple">Apple ID</AuthButton>

        <div className="my-4 text-center text-gray-400">— Ou continuez avec votre numéro —</div>

        {/* Phone Input */}
        <PhoneInput value={phone} onChange={setPhone} />

        {/* Continue Button */}
        <button
          onClick={handleLoginWithPhone}
          disabled={!phone}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium transition ${
            phone ? 'bg-primary hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-4">
          This site is protected by reCAPTCHA and the Google Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;