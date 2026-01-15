// src/components/dashboard/CommandeList.jsx
import React, { useState, useRef } from "react";
import InputBox from "./InputBox";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import config from "../../../config";
import axios from "axios";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';


export default function CommandeAdd({ commandes, onAddClick }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState('');
  const [montant, setMontant] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');


  const navigate = useNavigate();
  const nameChange = (e) => {
    setName(e.target.value);  // Mettre à jour l'état avec la nouvelle valeur
  };
  const phoneChange = (e) => {
    setPhone(e.target.value);  // Mettre à jour l'état avec la nouvelle valeur
  };
  const productChange = (e) => {
    setProduct(e.target.value); 
  };
  const montantChange = (e) => {
    setMontant(e.target.value); 
  };
  const addressChange = (e) => {
    setAddress(e.target.value); 
  };
   const toast = useRef(null);

  const clearToast = () => {
      toast.current.clear();
  };
  const showToast = () => {
      toast.current.show({ severity: 'info', summary: 'Info', detail: 'Séparer vos produits par le point virugle (;)', sticky: true });
  };
  
  const handleSubmit = async (e) => {
    const parseMontant = parseInt(montant);

    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Validation des champs requis
      if (!name || !phone || !product || !montant) {
        throw new Error("Remplissez tous les champs.");
      }

      if (typeof parseMontant !== 'number' || parseMontant <= 0) {
        throw new Error("Le montant total doit être un nombre positif.");
      }
      // Envoi de la requête POST pour enregistrer l'utilisateur
      const response = await axios.post(`${config.apiUrl}/order/new/`, { customer_name: name, products: product, customer_phone: phone, total_amount: parseMontant, customer_address: address });
      console.log("response = ", response);
      
      if(response.status === 200 || response.status === 201){ 

        await Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: 'Cette commande est enregistrée !',
        });

        navigate('/dashboard');
      } else {
        // Si l'API renvoie une erreur (par exemple un champ invalide)
        throw new Error(response.data.error || "Une erreur inconnue est survenue.");
      }

    } catch (error) {
      // Gestion des erreurs et affichage d'un message d'erreur
      setError(error.message || "Une erreur est survenue lors de l'enregistrement.");
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.message || "Une erreur inconnue est survenue.",
      });
      console.error("Erreur lors de l'enregistrement:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-6 bg-gray-100 opacity-95 rounded-lg p-4 border-2 border-gray-200 shadow-xl/30 lg:mx-20">
      <div className=" flex justify-start items-center mb-4 gap-3">
        <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center" onClick={() => navigate("/dashboard")}>
            <span className="text-white text-lg">⬅️</span>
          </div> 
        <h2 className="text-lg font-semibold secondary-color">Nouvelle Commande</h2>
      </div>
       <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</div>}          

        <InputBox placeholder={"Nom du client"} icon={"👤"} name={name} value={name} onChange={nameChange} />
        <InputBox placeholder={"Phone"} name={phone} type={"tel"} icon={"📞"} value={phone} onChange={phoneChange}  />
        {/* <InputBox icon={"📝"} /> */}

        <div className="card flex justify-content-center">
            <Toast ref={toast} position={"top-center"} />
            {/* <Button onClick={show} label="Show" /> */}
        </div>
        <div className="card flex justify-content-center">
            <InputTextarea onClick={showToast} autoResize value={product} onChange={(e) => setProduct(e.target.value)} rows={2} cols={30} className="w-full pl-10 pr-4 py-2 bg-gray-100 border-2 border-gray-200 text-blue-400 font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        
        {/* <textarea   placeholder={"Produits"} name={product} value={product} onChange={productChange}    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-2 border-gray-200 text-blue-400 font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" ></textarea> */}
        <span className="font-bold text-blue-900">Séparer vos produits par le point virugle (;)</span>
        <InputBox onClick={clearToast} placeholder={"Montant"} type={"number"} icon={"💰"} name={montant} value={montant} onChange={montantChange}  />
        <textarea   placeholder={"Adresse"} name={address} value={address} onChange={addressChange}    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-2 border-gray-200 text-blue-400 font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" ></textarea>

        <div className="flex justify-between content-center gap-8">

          {/* <button
              // onClick={handleSignup}
              className={`w-full py-2 px-4 rounded-lg text-white font-medium transition bg-gray-600 hover:bg-gray-400 hover:text-blue-800`}
                >
              Brouillon
            </button> */}
              <button
              onClick={handleSubmit}
              disabled={!phone || !product}
              className={`w-full py-2 px-4 rounded-lg text-white font-medium transition ${
                phone && product ? 'bg-action hover:text-blue-100 hover:font-bold' : 'bg-gray-400 cursor-not-allowed'
                }`}
                >
              Enregistrer
            </button>
            </div>
      </form>


    </div>
  );
}