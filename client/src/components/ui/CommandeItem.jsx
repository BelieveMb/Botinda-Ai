// src/components/dashboard/CommandeItem.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CommandeItem({ commande }) {
  const navigate = useNavigate();
  const getStatusColor = (status) => {
    switch (status) {
      case 'received': return 'bg-red-500 text-gray-100';
      case 'confirmée': return 'bg-yellow-100 text-yellow-800';
      case 'payée': return 'bg-green-100 text-green-800';
      case 'expédiée': return 'bg-blue-100 text-blue-800';
      case 'livrée': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-100 opacity-95 rounded-lg p-4 mb-3 shadow-sm border border-gray-200 hover:bg-gray-300">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold primary-color truncate w-36 lg:w-60">#{commande.idorder} - {commande.customer_name}</span>
            <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(commande.status)}`}>
              {commande.status}
            </span>
          </div>
          <p className="text-sm text-gray-800 w-64 truncate">{commande.products}</p>
          <p className="text-sm font-bold action-color">{commande.total_amount} FC</p>
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-full" onClick={() => navigate(`order/${commande.idorder}`)}>
          <span className=" text-2xl font-bold"> → </span> 
        </button>
      </div>
    </div>
  );
}