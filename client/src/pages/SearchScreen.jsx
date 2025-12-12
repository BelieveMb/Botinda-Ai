// src/pages/SearchScreen.jsx
import React, { useState, useMemo } from "react";
import Layout from "../layout/Layout";

export default function SearchScreen({ orders = [], onBack, onSelectOrder }) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Tatiana", "+24381...", "#1234"
  ]);

  // Simulons des données si aucune n'est passée
  const mockOrders = [
    {
      id: "1234",
      customer_name: "Mbuyi Tatiana",
      customer_phone: "+243817723066",
      products: "Robe Ankara x1, Sac x1",
      amount: 85000,
      status: "paid",
      created_at: "2025-04-05T14:32:00Z"
    },
    {
      id: "1235",
      customer_name: "Kanza Lutete",
      customer_phone: "+243991234567",
      products: "Chemise x2",
      amount: 50000,
      status: "shipped",
      created_at: "2025-04-04T10:15:00Z"
    },
    {
      id: "1236",
      customer_name: "Mpaka Jean",
      customer_phone: "+243898765432",
      products: "Pantalon x1",
      amount: 40000,
      status: "confirmed",
      created_at: "2025-04-03T09:45:00Z"
    }
  ];

  const allOrders = orders.length > 0 ? orders : mockOrders;

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short'
    });
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

  // Recherche intelligente
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase().trim();

    return allOrders.filter(order =>
      order.id.includes(q) ||
      order.customer_name.toLowerCase().includes(q) ||
      order.customer_phone.includes(q.replace(/\D/g, '')) || // cherche sans + ni espaces
      order.products.toLowerCase().includes(q)
    );
  }, [query, allOrders]);

  // Ajouter à l'historique quand on sélectionne
  const handleSelect = (order) => {
    const exists = recentSearches.some(s => s === order.customer_name || s === order.id);
    if (!exists) {
      setRecentSearches(prev => [order.customer_name, ...prev.slice(0, 4)]);
    }
    onSelectOrder?.(order);
  };

  // Effacer l'historique
  const clearRecent = () => {
    setRecentSearches([]);
  };

  return (
    <Layout>
      <main className="px-4 pt-6">

        {/* Barre de recherche */}
        <div className="mb-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nom, numéro, #1234, produit..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Résultats ou suggestions */}
        {query ? (
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-3">
              Résultats ({results.length})
            </h2>

            {results.length > 0 ? (
              <div className="space-y-3">
                {results.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => handleSelect(order)}
                    className="bg-white p-4 rounded-xl shadow-sm border hover:shadow transition cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">#{order.id} - {order.customer_name}</p>
                        <p className="text-sm text-gray-600 truncate">{order.products}</p>
                        <p className="text-xs text-gray-500 mt-1">{order.customer_phone} • {formatDate(order.created_at)}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status === 'paid' ? 'Payée' :
                         order.status === 'shipped' ? 'Expédiée' : 'Confirmée'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-lg font-bold text-gray-900">{order.amount.toLocaleString()} FC</p>
                      <button className="text-blue-600 text-sm font-medium">→ Détails</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">Aucune commande trouvée.</p>
                <p className="text-sm text-gray-400 mt-1">Essayez un nom, un numéro ou #1234</p>
              </div>
            )}
          </div>
        ) : (
          /* Écran d'accueil avec historique */
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-medium text-gray-500">Recherches récentes</h2>
              <button
                onClick={clearRecent}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Effacer tout
              </button>
            </div>

            {recentSearches.length > 0 ? (
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    onClick={() => setQuery(search)}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">👤</span>
                    </div>
                    <span className="flex-1 text-gray-800">{search}</span>
                    <span>→</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <p className="text-gray-500">Commencez à taper pour chercher une commande</p>
              </div>
            )}

            {/* Suggestions rapides */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Chercher par :</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setQuery("Tatiana")}
                  className="p-3 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition"
                >
                  🔹 Nom du client
                </button>
                <button
                  onClick={() => setQuery("+243")}
                  className="p-3 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition"
                >
                  📞 Numéro de téléphone
                </button>
                <button
                  onClick={() => setQuery("#")}
                  className="p-3 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition"
                >
                  🧾 ID de commande
                </button>
                <button
                  onClick={() => setQuery("robe")}
                  className="p-3 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition"
                >
                  🛍️ Produit
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}