// src/components/PhoneInput.jsx
import { useState } from 'react';

const PhoneInput = ({ value, onChange, placeholder = "Numéro de téléphone" }) => {
  const [prefix] = useState('+243'); // À adapter selon le pays

  const handleChange = (e) => {
    onChange(`${prefix}${e.target.value}`);
  };

  return (
    <div className="relative my-6">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">📞</span>
      <input
        type="tel"
        value={value.replace(prefix, '')}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-blue-500 text-blue-500"
      />
    </div>
  );
};

export default PhoneInput;