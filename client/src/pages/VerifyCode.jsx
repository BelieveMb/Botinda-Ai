// src/pages/VerifyCode.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeInput from '../components/smallComponents/CodeInput';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (enteredCode) => {
    setCode(enteredCode);
    console.log('Code reçu:', enteredCode);
    // Ici tu vérifierais le code avec Supabase
    navigate('/dashboard'); // ou '/profile' si besoin
  };

  return (
    <div className="min-h-screen bg-grayLight flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-8">
        <img src="/logo.png" alt="BoTinda AI" className="h-12 mx-auto" />
        <p className="text-sm text-gray-500 mt-1">
          Pas de compte ? <span className="text-primary cursor-pointer" onClick={() => navigate('/signup')}>S'inscrire</span>
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-poppins font-semibold text-primary mb-4">Connexion</h1>
        <p className="text-gray-600 mb-4">
          Nous venons de vous envoyer un code de vérification. Vérifiez votre messagerie.
        </p>

        <div className="my-4 text-center text-gray-400">— Or continuez avec un mot de passe —</div>

        {/* Code Input */}
        <CodeInput length={4} onComplete={handleVerify} />

        {/* Continue Button */}
        <button
          onClick={() => handleVerify(code)} // Pour test manuel
          disabled={code.length !== 4}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium transition ${
            code.length === 4 ? 'bg-primary hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'
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

export default VerifyCode;