import React from 'react'

function Header() {
  return (
      <div className="my-8 flex items-start justify-between gap-8  w-full ">
        <img src="../../public/logo.png" alt="BoTinda AI" className="w-24 h-12 border border-red-500 " />
        <p className="text-12 text-blue-900 mt-1">
          Pas de compte ? <span className="text-primary cursor-pointer font-bold " onClick={() => navigate('/signup')}>S'inscrire</span>
        </p>
      </div>
  )
}

export default Header