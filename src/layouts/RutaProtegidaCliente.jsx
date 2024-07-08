import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import HeaderCliente from "../components/panel_cliente/HeaderCliente"
import SidebarCliente from "../components/panel_cliente/SidebarCliente"
import SpinerPage from "../components/panel_cliente/SpinerPage"
import FooterCliente from "../components/panel_cliente/FooterCliente"
import "../styles/PanelCliente/FooterCliente.css"

import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"


const RutaProtegidaCliente = () => {

  const { auth, cargando } = useAuth()


  if (cargando) return <SpinerPage />

  return (
    <>
    
        {auth._id && auth.__t === 'Cliente' ? (
          <div className="bg-orange-100 flex flex-col h-screen " >
            <HeaderCliente />
            <div className="flex-1 overflow-y-auto" >
              <Outlet />
            </div>
            <FooterCliente />

          </div>

        ) : (
          <Navigate to="/" />
        )}

        <ToastContainer/>
 
    </>
  );

}

export default RutaProtegidaCliente