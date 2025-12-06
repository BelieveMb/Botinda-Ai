// src/pages/DashboardPage.jsx
import React, { useState } from "react";
import StatsCard from "../components/dashboard/StatsCard";
import FloatingActionButton from "../components/ui/FloatingActionButton";
import Header from "../layout/Header";
import CommandeList from "../components/ui/CommandeList";
import { useNavigate } from "react-router-dom";
import CommandeItem from "../components/ui/CommandeItem";
import SearchBar from "../components/ui/SearchBar";
import FilterDropdown from "../components/ui/FilterDropdown";
import OrderDetailCard from "../components/dashboard/OrderDetailCard";

export default function OrderDetail() {
  const navigate = useNavigate();   
   const order = {
    id: "1234",
    customer_name: "Mbuyi Tatiana",
    customer_phone: "+243817723066",
    products_raw: "Robe Ankara x1\nSac x1",
    total_amount: "10 000",
    status: "confirmed",
    created_at: "2025-04-05T14:32:00Z"
  };

  const handleStatusChange = (newStatus) => {
    console.log("Nouveau statut :", newStatus);
    // Ici, tu mets à jour la base de données
  };

  const handleSendMessage = () => {
    alert("Ouvre WhatsApp ou envoie un message via Twilio");
  };

  const handleRelanceIA = () => {
    alert("Génère un message intelligent avec OpenAI");
  }

  const handleAddCommande = () => {
    alert("Ouvre le formulaire d'ajout !");
    navigate("/order/new");
    // Ici, tu rediriges vers /order/new ou ouvres un modal
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <Header onMenuClick={() => alert("Menu ouvert")} />


      <main className="px-4 pt-6  bg-cover bg-center h-full" 
        style={{ backgroundImage: "url('../assets/BoTinda-agent.png')" }} >
      
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-200 p-3 rounded-lg">
          <StatsCard title="Commandes" value="1,368" change={37.8} icon="commandes" tabActive={'commande'} />
          <StatsCard title="Livraisons" value="100" change={37.8} icon="livraisons" />
        </div>

          <div className="mt-6">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-semibold text-secondary">Commandes</h2>
               <button
                 onClick={handleAddCommande }
                 className="bg-[#FFA500] text-[#002D6B] px-4 py-2 rounded-lg font-medium"
               >
                 Ajouter +
               </button>
             </div>
              <OrderDetailCard
                order={order}
                onStatusChange={handleStatusChange}
                onSendMessage={handleSendMessage}
                onRelanceIA={handleRelanceIA}
              />

           </div>
      </main>

      {/* Floating Button (mobile) */}
      <FloatingActionButton onClick={handleAddCommande}>
        +
      </FloatingActionButton>
    </div>
  );
}