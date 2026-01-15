// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import StatsCard from "../components/dashboard/StatsCard";
import FloatingActionButton from "../components/ui/FloatingActionButton";
import CommandeList from "../components/ui/CommandeList";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import axios from "axios";
import config from "../../config";
import { ProgressSpinner } from 'primereact/progressspinner';

export default function DashboardPage() {
  const navigate = useNavigate();   
  const [infoUser, setInfoUser] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState();

  const getId =  localStorage.getItem("iduser");
  const iduser = parseInt(getId);
  console.log("id ", iduser);
  

  useEffect(() => {
    const fetchInfoUser = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/authUser/userInfo/${iduser}`);
        const orderData = await axios.get(`${config.apiUrl}/order/myOrders/${iduser}`);

        if (error) throw error;
        setInfoUser(response.data);
        setCommandes(orderData.data);
      } catch (err) {
        setError(err.message);
        console.log("message d'erreur : ", err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInfoUser();
  }, [userId]);
  console.log("orderlist ", commandes);

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
      
        <h3 className="secondary-color text-xl mb-4 font-semibold">Hey, {infoUser ? infoUser.full_name : null} ! 👋</h3>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-200 p-3 rounded-lg">
          <StatsCard title="Commandes" value="1,368" change={37.8} icon="commandes" tabActive={'commande'} />
          <StatsCard title="Livraisons" value="100" change={37.8} icon="livraisons" />
        </div>

        {/* Liste des commandes */}
        {
          loading ? <div> <p className="text-center py-8 text-gray-500">Chargement des commandes...</p>
            <div className="card w-full flex justify-center items-center">
              <ProgressSpinner style={{width: '50px', height: '70px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
          </div>
          </div> : null
        
        }
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