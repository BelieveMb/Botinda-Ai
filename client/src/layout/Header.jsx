import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Faire le screen rapport et recherche et header
  return (
    <header className="bg-[#002D6B] text-white px-4 py-3 flex justify-between items-center shadow-md">
      <button onClick={onMenuClick} className="text-xl">
        ☰
      </button>
      <div className="flex space-x-2">
        <button  className={`text-2xl px-4 py-1 rounded-xl transition-colors ${isActive("/dashboard")
                  ? 'border-gray-50 border-0 border-b-4 font-bold' : 'text-blue-600'}`} onClick={() => navigate("/dashboard")}>🛒</button>
        <button className={`text-2xl rounded-xl px-4 py-1  transition-colors ${isActive("/report")
                  ? 'border-gray-50 border-0 border-b-4 font-bold' : 'text-blue-600'}`}  onClick={() => navigate("/report")}>📋</button>
        <button className={`text-2xl px-4 py-1  rounded-xl transition-colors ${isActive("/search")
                  ? 'border-gray-50 border-0 border-b-4 font-bold' : 'text-blue-600'}`}  onClick={() => navigate("/search")}>🔍</button>
        {/* <button className={`text-2xl  rounded-xl transition-colors ${isActive("/notification")
                  ? 'border-gray-50 border-0 border-b-4 font-bold' : 'text-blue-600'}`}  onClick={() => navigate("/notification")}>
          🔔<span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        </button> */}
      </div>
    </header>
  );
}