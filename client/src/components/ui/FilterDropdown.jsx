// src/components/ui/FilterDropdown.jsx
import React, { useState } from "react";

export default function FilterDropdown({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const filters = ['Tous', 'Confirmée', 'Payée', 'Expédiée', 'Livrée'];
  const [filterChange, setFilterChange] = useState();

  return (
    <div className="mb-4 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white secondary-color-text font-bold"
      >
        <span> Filtre :  {filterChange} </span>
        <span>▼</span>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white text-primary border border-gray-300 rounded-lg shadow-lg z-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                onFilterChange(filter);
                setIsOpen(false);
                setFilterChange(filter)
              }}
              className="block w-full text-left px-4 py-2 focus:bg-indigo-300 hover:bg-indigo-200 text-secondary cursor-pointer"
            >
              {filter}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}