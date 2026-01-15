// src/pages/ProfileScreen.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import axios from 'axios';
import config from '../../config';
import { ProgressSpinner } from 'primereact/progressspinner';

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
export default function Profile() {
  const [iduser, setUser] = useState(null);
  const [infoUser, setInfoUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const getId =  localStorage.getItem("iduser");
  const userId = parseInt(getId);
    console.log("id = ", userId);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!getId) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  
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
  }, [iduser]);
  console.log("infooooo ", infoUser);


  return (
    <Layout>

    <main className="px-4 pt-6 bg-gray-100 opacity-95">

    <div className="min-h-screen  pb-20">
      
      {infoUser === null ? 
      <>
      <h4>Chargement des informations...</h4>
      <div className="card w-full flex justify-center items-center">
        <ProgressSpinner style={{width: '50px', height: '70px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
      </div>
      </>
      : <><h4>Chargement des informations...</h4>

   


        <div className="bg-white rounded-xl p-6 mb-6 text-center shadow-sm">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-white font-bold">
              {infoUser.full_name?.charAt(0).toUpperCase() || '👤'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{infoUser.full_name}</h2>
          <p className="text-gray-600 mt-1">
            Vendeur BoTinda AI
          </p>
        </div>


        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h3 className="font-medium text-gray-800">Informations du compte</h3>
          </div>

          <div className="divide-y divide-gray-200">
            {infoUser.email && (
              <div className="p-4 flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  ✉️
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{infoUser.email}</p>
                </div>
              </div>
            )}

            {infoUser.phone && (
              <div className="p-4 flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  📞
                </div>
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-medium text-blue-800">{infoUser.phone}</p>
                </div>
              </div>
            )} 

            <div className="p-4 flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                🔑
              </div>
              <div>
                <p className="text-sm text-gray-500">ID Compte</p>
                <p className="font-mono text-xs text-gray-700 truncate">{infoUser.iduser}</p>
              </div>
            </div>
          </div>
        </div>


        <div className="space-y-3">
          <button
            onClick={() => alert("Fonctionnalité à venir : Modifier le profil")}
            className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm"
          >
            <span className="font-medium text-gray-800">Modifier le profil</span>
            <span>→</span>
          </button>

          <button
            onClick={() => alert("Fonctionnalité à venir : Paramètres")}
            className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm"
          >
            <span className="font-medium text-gray-800">Paramètres</span>
            <span>→</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow-sm"
          >
            🔒 Se déconnecter
          </button>
        </div>
        
        </>}
        {/* Footer léger */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>BoTinda AI • v1.0</p>
        </div>
        </div>
    </main>
    </Layout>
  );
}