import { Link, useLocation } from "react-router-dom";
import "../../styles/PanelCliente/FooterCliente.css"
import React, { useState, useEffect } from 'react';


const FooterCliente = () => {
  const [activeTab, setActiveTab] = useState(1);
  const location = useLocation();

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="bg-white fixed bottom-0 rounded-t-xl  left-0 w-full " style={{
      boxShadow: '-1px -7px 5px -4px rgba(117,117,117,1)', // Establece la sombra en la parte superior
    }}>
      <div className="flex justify-between" >
        <Link to="/cliente">
          <div
            className={`py-2 px-4 cursor-pointer md:w-64 flex justify-center items-center ${location.pathname === '/cliente' ? 'bg-orange-600 text-white rounded-t-xl' : 'text-orange-400'
          }`}
            onClick={() => handleTabClick(1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ">
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>

          </div>
        </Link>
       

        <Link to="/cliente/perfil">
          <div
            className={`py-2 px-4 cursor-pointer md:w-64 flex justify-center items-center ${location.pathname === '/cliente/perfil' ? 'bg-orange-600 text-white rounded-t-xl' : 'text-orange-400'
              }`}
            onClick={() => handleTabClick(5)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>


          </div>
        </Link>
      </div>

    </div>
  )
}

export default FooterCliente