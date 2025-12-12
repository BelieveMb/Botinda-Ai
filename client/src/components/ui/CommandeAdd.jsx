// src/components/dashboard/CommandeList.jsx
import React, { useState } from "react";
import CommandeItem from "./CommandeItem";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import InputBox from "./InputBox";
import { useNavigate } from "react-router-dom";

export default function CommandeAdd({ commandes, onAddClick }) {
  const [phone, setPhone] = useState('');
  const [produits, setProduits] = useState('');
  const navigate = useNavigate();
 
  return (
    <div className="mt-6 bg-gray-100 opacity-95 rounded-lg p-4 border-2 border-gray-200 shadow-xl/30">
      <div className=" flex justify-start items-center mb-4 gap-3">
        <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center" onClick={() => navigate("/dashboard")}>
            <span className="text-white text-lg">⬅️</span>
          </div> 
        <h2 className="text-lg font-semibold secondary-color">Nouvelle Commande</h2>
      </div>

      <InputBox placeholder={"Nom du client"} icon={"👤"} />
      <InputBox placeholder={"Phone"} icon={"📞"} value={phone} onChange={setPhone} />
      <InputBox placeholder={"Produits"} icon={"📝"} value={produits} onChange={setProduits} />
      <InputBox placeholder={"Montant"} icon={"💰"} />

      <div className="flex justify-between content-center gap-8">

        <button
            // onClick={handleSignup}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition bg-gray-600 hover:bg-gray-400 hover:text-blue-800`}
              >
            Brouillon
          </button>
            <button
            // onClick={handleSignup}
            disabled={!phone || !produits}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition ${
              phone && produits ? 'bg-action hover:text-blue-100 hover:font-bold' : 'bg-gray-400 cursor-not-allowed'
              }`}
              >
            Enregistrer
          </button>
          </div>


    </div>
  );
}