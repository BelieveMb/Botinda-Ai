// src/components/Layout.jsx

import Sidebar from "./SideBar";

export default function LayoutDash({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="ml-64 flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Tableau de bord</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Josiane M.</span>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              J
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="p-6 ">
          {children}
        </main>
      </div>
    </div>
  );
}