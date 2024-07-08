

import iconsedes from "../../assets/sede.png"
import iconempleos from "../../assets/empleo.png"
import iconclientes from "../../assets/icon-clientes.png"
import { useEffect, useState, Fragment, useRef } from "react"
import { Dialog, Transition } from '@headlessui/react'


import CalificacionCV from "./CalificacionCV"
import useSedes from "../../hooks/useSedes"
import useEmpleos from "../../hooks/useEmpleos"


const TABLE_HEAD = ["Cliente", "Mesa", "Fecha - Hora", "Acción"];

const PanelAdmin = () => {


  const { sedes } = useSedes();
  const { empleos, empleosPublic } = useEmpleos();
  // Contar el número de sedes
  const numeroDeSedes = sedes.length;
  const numeroDeEmpleos = empleos.length;

   // Función para contar todos los postulantes
   const contarPostulantes = (empleos) => {
    let totalPostulantes = 0;

    // Recorrer cada empleo y sumar los postulantes de cada uno
    empleos.forEach((empleo) => {
      if (empleo.postulantes && Array.isArray(empleo.postulantes)) {
        totalPostulantes += empleo.postulantes.length;
      }
    });

    return totalPostulantes;
  };

  // Obtener el total de postulantes
  const totalPostulantes = contarPostulantes(empleosPublic);
  return (

    <>


      <div className="">
        <h1 className="text-2xl font-black">Hola, Admin</h1>

        <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0 ">
          <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg flex justify-between  transform hover:scale-105 transition duration-500 bg-gradient-to-r from-orange-900  to-orange-400">
            <div className="">
              <h3 className="mb-3 text-4xl font-bold text-white">{numeroDeSedes}</h3>
              <h3 className="mb-3 text-xl font-normal text-white">Todas las Sedes</h3>
            </div>

            <img className=" w-20 h-20 " src={iconsedes} alt="" />

          </div>
          <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg flex justify-between  transform hover:scale-105 transition duration-500 bg-gradient-to-r from-orange-900  to-orange-400">
            <div className="">
              <h3 className="mb-3 text-4xl font-bold text-white">{numeroDeEmpleos}</h3>
              <h3 className="mb-3 text-xl font-normal text-white">Total Empleos</h3>
            </div>

            <img className=" w-20 h-20 " src={iconempleos} alt="" />

          </div>
          <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg flex justify-between  transform hover:scale-105 transition duration-500 bg-gradient-to-r from-orange-900  to-orange-400">
            <div className="">
              <h3 className="mb-3 text-4xl font-bold text-white">{totalPostulantes}</h3>
              <h3 className="mb-3 text-lg font-normal text-white">Total Postulantes</h3>
            </div>

            <img className=" w-20 h-20 " src={iconclientes} alt="" />

          </div>

        </div>

        <div>
          <CalificacionCV></CalificacionCV>
        </div>

      </div>
    </>
  )
}

export default PanelAdmin