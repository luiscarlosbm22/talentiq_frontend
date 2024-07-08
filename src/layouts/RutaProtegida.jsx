import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/panel_admin/Header"
import Sidebar from "../components/panel_admin/Sidebar"
import { useState, useEffect } from "react"

import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

const RutaProtegida = () => {
    const [open, setOpen] = useState(window.innerWidth > 768);

    const { auth, cargando } = useAuth()

    if (cargando) return 'Cargando...'



    

    return (
        <>
            {auth._id && auth.__t === 'Admin' ? (
                <div className="min-h-screen" style={{ backgroundColor: '#f0f0fa' }}>

                    <div className=" ">
                        <Sidebar open={open} setOpen={setOpen} />
                        <main className={`flex-1 p-5 ${open ? "ml-72" : "ml-20"}`}>
                            <Outlet />
                        </main>
                    </div>
                </div>
            ) : <Navigate to="/" />}

            <ToastContainer />
        </>
    )
}

export default RutaProtegida