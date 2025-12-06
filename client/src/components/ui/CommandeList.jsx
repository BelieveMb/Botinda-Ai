// src/components/dashboard/CommandeList.jsx
import React, { useState } from "react";
import CommandeItem from "./CommandeItem";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";

export default function CommandeList({ commandes, onAddClick }) {
  const [filter, setFilter] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCommandes = commandes.filter(cmd => {
    const matchesFilter = filter === 'Tous' || cmd.status === filter.toLowerCase();
    const matchesSearch = cmd.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cmd.produit.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-secondary text-blue-700">Commandes</h2>
        <button
          onClick={onAddClick}
          className="bg-[#FFA500] text-[#002D6B] px-4 py-2 rounded-lg font-medium"
        >
          Ajouter +
        </button>
      </div>

      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <FilterDropdown onFilterChange={setFilter} />

      {filteredCommandes.length > 0 ? (
        filteredCommandes.map(cmd => <CommandeItem key={cmd.id} commande={cmd} />)
      ) : (
        <div className="text-center py-8 text-gray-500">Aucune commande trouvée.</div>
      )}

      <div className="mt-6 flex justify-center">
        <button className="bg-white border border-gray-300 px-6 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
          Load more
        </button>
      </div>
    </div>
  );
}