// src/components/ui/SearchBar.jsx -
import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Trouvez une commande" }) {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-gray-100 border-2 border-blue-300 text-blue-400 font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
    </div>
  );
}