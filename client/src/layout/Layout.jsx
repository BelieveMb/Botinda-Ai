import React, { useEffect, useState } from 'react'
import Header from './Header'

function Layout({children}) {
  const [user, setUser] = useState(null);
  const getId =  localStorage.getItem("iduser");

  useEffect(() => {
    const currentUser = parseInt(getId);
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
  }, [navigate]);
  return (
     <div className="min-h-screen bg-gray-50 pb-20">
      <Header onMenuClick={() => alert("Menu ouvert")} />

      <main className="px-4 pt-6  bg-cover bg-center h-full lg:mx-20" 
        style={{ backgroundImage: "url('../../public/BoTinda_agent1.png')" }} >
            {children}
      </main>
      
    </div>
  )
}

export default Layout