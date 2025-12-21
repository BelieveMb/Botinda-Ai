// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import StatsCard from "../components/dashboard/StatsCard";
import FloatingActionButton from "../components/ui/FloatingActionButton";
import CommandeList from "../components/ui/CommandeList";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import axios from "axios";
import config from "../../config";

export default function DashboardPage() {
  const navigate = useNavigate();   
  const [infoUser, setInfoUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = 1;
  useEffect(() => {
    const fetchInfoUser = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/authUser/userInfo/${userId}`);
        if (error) throw error;
        setInfoUser(response.data);
      } catch (err) {
        setError(err.message);
        console.log("message d'erreur : ", err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInfoUser();
  }, [userId]);

  const [commandes, setCommandes] = useState([
    {
      id: 1,
      client: "Mbuiy Tatiana",
      produit: "Robe Ankara x1, Sac x1",
      montant: "85 000",
      status: "confirmée"
    },
    // {
    //   id: 2,
    //   client: "Kanza L.",
    //   produit: "Chemise x2",
    //   montant: "50 000",
    //   status: "payée"
    // },
    // {
    //   id: 3,
    //   client: "Mpaka J.",
    //   produit: "Pantalon x1",
    //   montant: "40 000",
    //   status: "expédiée"
    // },
    // {
    //   id: 4,
    //   client: "Nkosi T.",
    //   produit: "Chaussures x1",
    //   montant: "60 000",
    //   status: "livrée"
    // }
  ]);

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
        style={{ backgroundImage: "url('../../public/BoTinda_agent1.png')" }} >
      
        <h3 className="secondary-color text-xl mb-4 font-semibold">Hey, {infoUser.full_name} ! 👋</h3>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-200 p-3 rounded-lg">
          <StatsCard title="Commandes" value="1,368" change={37.8} icon="commandes" tabActive={'commande'} />
          <StatsCard title="Livraisons" value="100" change={37.8} icon="livraisons" />
        </div>

        {/* Liste des commandes */}
        <CommandeList
          commandes={commandes}
          onAddClick={handleAddCommande}
        />
      </main>

      {/* Floating Button (mobile) */}
      <FloatingActionButton onClick={handleAddCommande}>
        +
      </FloatingActionButton>
    </div>
  );
}