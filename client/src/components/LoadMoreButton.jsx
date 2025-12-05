// src/components/LoadMoreButton.jsx
import React from "react";

export default function LoadMoreButton({ onClick, isLoading = false }) {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`px-6 py-2 rounded-lg font-medium ${
          isLoading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        {isLoading ? 'Chargement...' : 'Load more'}
      </button>
    </div>
  );
}