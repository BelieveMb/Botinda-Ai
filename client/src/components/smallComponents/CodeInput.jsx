// src/components/CodeInput.jsx
import { useState, useRef, useEffect } from 'react';

const CodeInput = ({ length = 4, onComplete }) => {
  const inputsRef = useRef([]);

  const [code, setCode] = useState(Array(length).fill(''));

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === '') {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < length - 1) {
        inputsRef.current[index + 1].focus();
      }

      // Check if complete
      if (newCode.every(c => c !== '') && onComplete) {
        onComplete(newCode.join(''));
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="flex space-x-2 mb-4">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          maxLength="1"
          value={code[i]}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-12 h-12 text-center text-xl font-bold text-blue-500 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          pattern="\d"
        />
      ))}
    </div>
  );
};

export default CodeInput;