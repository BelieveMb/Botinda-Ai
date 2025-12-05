// src/components/ui/FloatingActionButton.jsx
import React from "react";

export default function FloatingActionButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#FFA500] text-[#002D6B] rounded-full shadow-lg flex items-center justify-center text-xl font-bold hover:bg-[#FF8C00] transition"
    >
      {children}
    </button>
  );
}