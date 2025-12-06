import React from "react";

export default function Header({ onMenuClick }) {
  return (
    <header className="bg-[#002D6B] text-white px-4 py-3 flex justify-between items-center shadow-md">
      <button onClick={onMenuClick} className="text-xl">
        ☰
      </button>
      <div className="flex space-x-8">
        <button className="text-2xl hover:bg-red-500">X🛒</button>
        <button className="text-xl">🔍</button>
        <button className="text-xl">🔍</button>
        <button className="text-xl relative">
          🔔<span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}