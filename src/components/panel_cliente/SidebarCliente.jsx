import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import "../../styles/PanelCliente/Sidebar.css"

import React from "react";


import { useState } from 'react';


const SidebarCliente = () => {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const { cerrarSesionAuth, auth} = useAuth()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const handleCerrarSesion = () => {
    cerrarSesionAuth()
    //cerrarSesionBlogs()
    localStorage.removeItem('token')
  }
  const cerrarDrawer = () => {
    setIsDrawerOpen(false);
  }
  return (

    <>
      
    </>
  );
}

export default SidebarCliente