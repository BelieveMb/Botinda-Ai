import React, { useState } from "react";
import StatsCard from "../components/dashboard/StatsCard";
import FloatingActionButton from "../components/ui/FloatingActionButton";
import Header from "../layout/Header";
import CommandeAdd from "../components/ui/CommandeAdd";

export default function NewOrder() {
  const [commandes, setCommandes] = useState([
    {
      id: 1,
      client: "Mbuiy Tatiana",
      produit: "Robe Ankara x1, Sac x1",
      montant: "85 000",
      status: "confirmée"
    },
    {
      id: 2,
      client: "Kanza L.",
      produit: "Chemise x2",
      montant: "50 000",
      status: "payée"
    },
    {
      id: 3,
      client: "Mpaka J.",
      produit: "Pantalon x1",
      montant: "40 000",
      status: "expédiée"
    },
    {
      id: 4,
      client: "Nkosi T.",
      produit: "Chaussures x1",
      montant: "60 000",
      status: "livrée"
    }
  ]);

  const handleAddCommande = () => {
    alert("Ouvre le formulaire d'ajout !");
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

        <CommandeAdd />
      </main>

      {/* Floating Button (mobile) */}
      <FloatingActionButton onClick={handleAddCommande}>
        +
      </FloatingActionButton>
    </div>
  );
}