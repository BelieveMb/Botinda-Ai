// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthButton from '../components/smallComponents/AuthButton';
import PhoneInput from '../components/smallComponents/PhoneInput';
import InputBox from '../components/ui/InputBox';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    
    console.log('Inscription avec:', { phone, password });
    // Ici tu appellerais Supabase pour créer l'utilisateur
    navigate('/verify-code'); // ou directement dashboard si pas de SMS
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
        <h1 className="text-2xl font-poppins font-semibold text-primary mb-4">S'inscrire</h1>
        <p className="text-gray-600 mb-6">Connectez-vous avec</p>

        {/* Social Buttons */}
        <AuthButton provider="google">Google</AuthButton>
        <AuthButton provider="apple">Apple ID</AuthButton>

        <div className="my-4 text-center text-gray-400">— Ou continuez avec votre numéro —</div>

        
        <div className="relative my-6">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">👤</span>
          <input
            type="tel"
            value={fullname}
            onChange={setFullname}
            placeholder={"Ex. David Okit"}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-blue-500 text-blue-800 font-bold"
          />
        </div>
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
          onClick={handleSignup}
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
      </div>
    </div>
  );
};

export default Register;