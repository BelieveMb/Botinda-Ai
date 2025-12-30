// src/pages/DashboardPage.jsx
import React, { useState, useEffect} from "react";
import StatsCard from "../components/dashboard/StatsCard";
import FloatingActionButton from "../components/ui/FloatingActionButton";
import Header from "../layout/Header";
import CommandeList from "../components/ui/CommandeList";
import { useNavigate, useParams } from "react-router-dom";
import CommandeItem from "../components/ui/CommandeItem";
import SearchBar from "../components/ui/SearchBar";
import FilterDropdown from "../components/ui/FilterDropdown";
import OrderDetailCard from "../components/dashboard/OrderDetailCard";
import axios from "axios";
import config from "../../config";


export default function OrderDetail() {
  const navigate = useNavigate();   
  const { idorder } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commandes, setCommandes] = useState();
 

  console.log("data ID ", idorder);
  
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
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await axios.get(`${config.apiUrl}/order/detail/${idorder}`);
        if (error) throw error;
        setCommandes(orderData.data);
      } catch (err) {
        setError(err.message);
        console.log("message d'erreur : ", err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [idorder]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <Header onMenuClick={() => alert("Menu ouvert")} />


      <main className="px-4 pt-6  bg-cover bg-center h-full" 
        style={{ backgroundImage: "url('../../public/BoTinda_agent1.png')" }} >
      
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-200 p-3 rounded-lg">
          <StatsCard title="Commandes" value="1,368" change={37.8} icon="commandes" tabActive={'commande'} />
          <StatsCard title="Livraisons" value="100" change={37.8} icon="livraisons" />
        </div>

          <div className="mt-6">

              <OrderDetailCard
                order={commandes}
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