// src/components/dashboard/CommandeList.jsx
import React, { useState } from "react";
import CommandeItem from "./CommandeItem";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import InputBox from "./InputBox";

export default function CommandeAdd({ commandes, onAddClick }) {
  const [phone, setPhone] = useState('');
  const [produits, setProduits] = useState('');

 
  return (
    <div className="mt-6 bg-gray-100 opacity-95 rounded-lg p-4 border-2 border-gray-200 shadow-xl/30">
      <div className="b flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-secondary">Nouvelle Commande</h2>
        <button
          onClick={onAddClick}
          className="bg-[#FFA500] text-[#002D6B] px-4 py-2 rounded-lg font-medium"
        >
          Ajouter +
        </button>
      </div>

      <InputBox placeholder={"Nom du client"} icon={"👤"} />
      <InputBox placeholder={"Phone"} icon={"📞"} value={phone} onChange={setPhone} />
      <InputBox placeholder={"Produits"} icon={"📝"} value={produits} onChange={setProduits} />
      <InputBox placeholder={"Montant"} icon={"💰"} />

       <button
          // onClick={handleSignup}
          disabled={!phone || !produits}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium transition ${
            phone && produits ? 'bg-primary hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Enregistrer
        </button>


    </div>
  );
}