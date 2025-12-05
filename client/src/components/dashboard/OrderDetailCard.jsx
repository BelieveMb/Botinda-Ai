// src/components/dashboard/OrderDetailCard.jsx
import React, { useState } from "react";

export default function OrderDetailCard({ order, onStatusChange, onSendMessage, onRelanceIA }) {
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order.status);

  // Liste des statuts possibles (à adapter selon ta DB)
  const statuses = [
    { value: 'received', label: 'Reçue', color: 'bg-gray-100 text-gray-800' },
    { value: 'confirmed', label: 'Confirmée', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'paid', label: 'Payée', color: 'bg-green-100 text-green-800' },
    { value: 'shipped', label: 'Expédiée', color: 'bg-blue-100 text-blue-800' },
    { value: 'delivered', label: 'Livrée', color: 'bg-gray-200 text-gray-700' }
  ];

  const getStatusConfig = (status) => {
    return statuses.find(s => s.value === status) || statuses[0];
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    onStatusChange?.(newStatus);
    setIsEditingStatus(false);
  };

  const formatPhone = (phone) => {
    if (!phone) return "";
    // Format international : +243...
    return phone.replace(/^(\+\d{2})/, '$1 ');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">📦</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Commandes</h2>
        </div>
        <button className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white">
          🗑️
        </button>
      </div>

      {/* Commande info */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg font-bold text-blue-900">#{order.id} - {order.customer_name}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <span>📞</span>
          <a href={`tel:${order.customer_phone}`} className="hover:text-blue-600">
            {formatPhone(order.customer_phone)}
          </a>
        </div>
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
        {isEditingStatus ? (
          <div className="flex space-x-2">
            {statuses.map(status => (
              <button
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
                className={`px-3 py-1 rounded-md text-xs font-medium ${status.color}`}
              >
                {status.label}
              </button>
            ))}
          </div>
        ) : (
          <div
            onClick={() => setIsEditingStatus(true)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-md cursor-pointer ${getStatusConfig(selectedStatus).color}`}
          >
            <span className="w-3 h-3 rounded-full bg-current"></span>
            <span>{getStatusConfig(selectedStatus).label}</span>
            <span>▼</span>
          </div>
        )}
      </div>

      {/* Products */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Produits</label>
        <div className="bg-gray-50 rounded-md p-3">
          {order.products_raw.split('\n').map((line, index) => (
            <p key={index} className="text-gray-800">{line.trim()}</p>
          ))}
        </div>
      </div>

      {/* Montant */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Montant</label>
        <p className="text-xl font-bold text-gray-900">{order.total_amount} FC</p>
      </div>

      {/* Date */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <p className="text-gray-800">{new Date(order.created_at).toLocaleString('fr-FR')}</p>
      </div>

      {/* Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={onSendMessage}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
        >
          <span>💬</span>
          <span>Envoyer un message</span>
        </button>
        <button
          onClick={onRelanceIA}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-[#002D6B] font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
        >
          <span>🤖</span>
          <span>Relance IA</span>
        </button>
      </div>
    </div>
  );
}