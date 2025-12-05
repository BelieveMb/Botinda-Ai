// src/components/AuthButton.jsx
import { FaGoogle, FaApple } from 'react-icons/fa';

const AuthButton = ({ provider, children }) => {
  return (
    <button
      className="flex items-center justify-center w-full py-2 px-4 mb-4 border border-gray-300 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-50 transition"
    >
      {provider === 'google' && <FaGoogle className="mr-2 text-red-500" />}
      {provider === 'apple' && <FaApple className="mr-2 text-black" />}
      {children}
    </button>
  );
};

export default AuthButton;