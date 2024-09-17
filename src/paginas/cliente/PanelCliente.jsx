import { Link } from "react-router-dom"
import "../../styles/PanelCliente/InicioCliente.css"
import useAuth from "../../hooks/useAuth"
import React from "react";
import "../../styles/PanelCliente/cardBienvenido.css"


import io from 'socket.io-client';
import { useState, useEffect } from "react";
import useEmpleos from "../../hooks/useEmpleos";
import useSedes from "../../hooks/useSedes";
import ListaEmpleos from "./ListaEmpleos";




const PanelCliente = () => {

  const { empleos } = useEmpleos();
  const { sedesPublic } = useSedes();

  return (
    <>

      <div className=" md:pl-10 md:pr-20 ">

        <div className=" pt-2 pb-5  flex justify-center items-center ">
          <h1 className="font-bold text-lg  text-gray-800">Nuestras Sedes</h1>

        </div>
        <section id="Projects" className="flex flex-col md:flex-row gap-5 justify-center items-center pl-1 pr-1 pb-5">
          {sedesPublic.map((sede, index) => (
            <div key={index} className="flex gap-5">

              <div className="w-28 h-28 md:w-48 md:h-36 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl flex justify-center items-center">
                <div>
                  <h1 className="text-center text-gray-700 text-sm font-semibold">{sede.nombre}</h1>
                  <img src={sede.linkImagen} alt={sede.nombre} className="object-cover w-20 h-20 md:w-44 md:h-28 rounded-xl" />
                </div>
              </div>

            </div>
          ))}
        </section>
        <div className="p-10">
          <ListaEmpleos />
        </div>
        

      </div>
    </>
  );
}

export default PanelCliente