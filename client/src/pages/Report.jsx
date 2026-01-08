// src/pages/SalesReportPage.jsx
import React, { useState, useMemo } from "react";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";

export default function Report() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Simulons des données réelles
  const orders = [
    {
      id: "1234",
      customer_name: "Mbuyi Tatiana",
      products: "Robe Ankara x1, Sac x1",
      amount: 85000,
      status: "paid",
      created_at: "2025-12-11T14:32:00Z"
    },
    {
      id: "1235",
      customer_name: "Kanza L.",
      products: "Chemise x2",
      amount: 50000,
      status: "shipped",
      created_at: "2025-12-11T10:15:00Z"
    },
    {
      id: "1236",
      customer_name: "Mpaka J.",
      products: "Pantalon x1",
      amount: 40000,
      status: "confirmed",
      created_at: "2025-04-05T09:45:00Z"
    }
  ];
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // mois commencent à 0
  const year = date.getFullYear();

  const formatted = `${day}-${month}-${year}`;
  console.log("La date = ", formatted);
  
  // Filtrer les commandes par date sélectionnée
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const orderDate = new Date(order.created_at).toISOString().split('T')[0];
      return orderDate === selectedDate;
    });
  }, [orders, selectedDate]);

  // Calculer les stats
  const stats = useMemo(() => {
    const totalOrders = filteredOrders.length;
    const totalAmount = filteredOrders.reduce((sum, o) => sum + o.amount, 0);
    const paidOrders = filteredOrders.filter(o => o.status === 'paid').length;
    const pendingAmount = filteredOrders
      .filter(o => o.status !== 'paid')
      .reduce((sum, o) => sum + o.amount, 0);

    return { totalOrders, totalAmount, paidOrders, pendingAmount };
  }, [filteredOrders]);

  // Fonction pour formater la date en français
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Couleurs par statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>

      <main className="px-4 pt-6 bg-gray-100 opacity-95">

        {/* Date Picker */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Sélectionner une date
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Titre avec date formatée */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Ventes du {formatDate(`${selectedDate}T00:00:00Z`)}
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <p className="text-sm text-gray-500">Total Commandes</p>
            <p className="text-2xl font-bold secondary-color">{stats.totalOrders}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <p className="text-sm text-gray-500">Montant Total</p>
            <p className="text-xl font-bold text-green-600">{stats.totalAmount.toLocaleString()} FC</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <p className="text-sm text-gray-500">Payées</p>
            <p className="text-xl font-semibold secondary-color">{stats.paidOrders}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <p className="text-sm text-gray-500">En attente</p>
            <p className="text-xl font-semibold text-orange-600">{stats.pendingAmount.toLocaleString()} FC</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="bg-[#FFA500] hover:bg-[#FF8C00] text-[#002D6B] font-medium px-6 py-2 rounded-lg shadow">📄 Generer le rapport</button>
        </div>
        {/* Liste des commandes */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h3 className="font-medium text-gray-800">Commandes du jour ({filteredOrders.length})</h3>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-25 transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">#{order.id} - {order.customer_name}</p>
                      <p className="text-sm text-gray-600">{order.products}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status === 'paid' ? 'Payée' : 
                       order.status === 'shipped' ? 'Expédiée' : 'Confirmée'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-lg font-bold text-gray-900">{order.amount.toLocaleString()} FC</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium">
                      <Link to={"/order/1"}>Détails →</Link>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Aucune commande pour cette date.
              </div>
            )}
          </div>
        </div>

        {/* Bouton d’export (optionnel futur) */}
        <div className="mt-6 text-center">
          <button className="bg-[#FFA500] hover:bg-[#FF8C00] text-[#002D6B] font-medium px-6 py-2 rounded-lg shadow">
            📄 Exporter en PDF
          </button>
        </div>

      </main>

    </Layout>

  );
}