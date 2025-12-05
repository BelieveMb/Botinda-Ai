// src/components/Sidebar.jsx
export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-blue-900 text-white fixed">
      <div className="p-5">
        <h1 className="text-xl font-bold">BoTinda IA</h1>
      </div>
      <nav className="mt-5">
        <ul className="space-y-4 px-4">
          <li>
            <a href="/dashboard" className="block py-2 px-4 rounded hover:bg-blue-800">
              🏠 Accueil
            </a>
          </li>
          <li>
            <a href="/orders" className="block py-2 px-4 rounded hover:bg-blue-800">
              📦 Commandes
            </a>
          </li>
          <li>
            <a href="/notifications" className="block py-2 px-4 rounded hover:bg-blue-800">
              🔔 Notifications
            </a>
          </li>
          <li>
            <a href="/reports" className="block py-2 px-4 rounded hover:bg-blue-800">
              📊 Rapports
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}