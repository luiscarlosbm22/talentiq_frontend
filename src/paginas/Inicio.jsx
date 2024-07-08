import React from 'react'
import "../styles/CardsInicio.css"
import "../styles/CardOptions.css"

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import CarouselInicio from '../components/CarouselInicio'
import phones_fastfood from "../assets/phones_fastfood.png"


const Inicio = () => {



  return (
    <>
      <div className='mx-auto flex  max-w-7xl items-center justify-between p-2 lg:px-8 '>
        <div className='flex-col md:flex md:flex-row gap-10'>
          <div>
            <h2 className='font-bold text-5xl md:text-7xl p-5 md:p-10 text-orange-700'>Tu Trabajo Ideal !</h2>
            <div className='flex flex-col md:flex md:flex-row '>
              <Link to="/login/registrar" className='text-white bg-orange-500 rounded-md p-2  md:ml-10 ml-5 md:w-60 w-60 text-xl md:text-2xl font-bold'>Encuentralo aquí</Link>
              <span className='text-2xl ml-5 md:ml-10 font-bold text-gray-800'>Postula ahora</span><br />
            </div>

            <div className=' md:mt-1 items-center flex'>
              <span className='pl-5 md:pl-10 pb-5 text-sm text-gray-900'> Se parte de nosotros. Nuestra innovadora aplicación web está diseñada para hacer que tu experiencia de buscar un trabajo sea más rápida, impulsada por Inteligencia Artificial.</span>
            </div>

          </div>
          <div className='flex justify-center items-center'>
            <div className="card">
              <div className="item item--1">
                <img src="https://img.freepik.com/foto-gratis/hombre-guapo-joven-cuadernos-concepto-e-learning-cursos_1258-26588.jpg?t=st=1720326395~exp=1720329995~hmac=c2167f5292f55bf6458cc4c6ff79ccce9a259a79b2986283bf06b9f0b218c89c&w=1060" alt="" className=' rounded-xl' />

              </div>
              <div className="item item--2">
                <img src="https://img.freepik.com/foto-gratis/estudiantes-sabiendo-respuesta-correcta_329181-14271.jpg?t=st=1720326507~exp=1720330107~hmac=9141198141a3993c9c750360537e0e46da67308a199c81febbbf1310c68b0eed&w=1060" alt="" className=' rounded-xl' />
              </div>
              <div className="item item--3">
                <img src="https://img.freepik.com/foto-gratis/mujer-asiatica-sonriente-que-presenta-biblioteca-publica_74855-1621.jpg?t=st=1720326593~exp=1720330193~hmac=9018cf3e6378a707997f1c2fda58b429b8b7e37e1ac72b9521003bba2d2f9183&w=1060" alt="" className=' rounded-xl' />
              </div>
              <div className="item item--4">
                <img src="https://img.freepik.com/foto-gratis/hombre-negocios-traje-negro-sosteniendo-su-lista-tareas-hace-pulgar-arriba_114579-15902.jpg?t=st=1720326428~exp=1720330028~hmac=c24177a5caf320f870558d61b0ed038ed78d1ca02efb61abc03bc7aaad798cb7&w=1060" alt="" className=' rounded-xl' />
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className=''>
        <div className="container my-12 mx-auto px-4 md:px-12">
          <div className="flex flex-wrap -mx-1 lg:-mx-4 gap-10 justify-center items-center">

            <div className="card-options">

              <div className="card-content-options">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users bg-orange-600 text-white rounded-full p-1" width={50} height={50} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                </svg>
                <p className="card-title-options">Disponibilidad</p>
                <p className="card-para-options">Postula cuando quieras, desde donde quieras</p>
              </div>
            </div>

            <div className="card-options">
              <div className="card-content-options">
                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-home-hand bg-orange-600 text-white rounded-full p-1">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                  <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
                  <path d="M12 12l0 .01" />
                  <path d="M3 13a20 20 0 0 0 18 0" />
                </svg>
                <p className="card-title-options">Trabajo Ideal</p>
                <p className="card-para-options">Encuentra los trabajos que necesitas, para ti.</p>
              </div>

            </div>

            <div className="card-options">
              <div className="card-content-options">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home-hand bg-orange-600 text-white rounded-full p-1" width={50} height={50} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M18 9l-6 -6l-9 9h2v7a2 2 0 0 0 2 2h3.5"></path>
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2"></path>
                  <path d="M16 17.5l-.585 -.578a1.516 1.516 0 0 0 -2 0c-.477 .433 -.551 1.112 -.177 1.622l1.762 2.456c.37 .506 1.331 1 2 1h3c1.009 0 1.497 -.683 1.622 -1.593c.252 -.938 .378 -1.74 .378 -2.407c0 -1 -.939 -1.843 -2 -2h-1v-2.636c0 -.754 -.672 -1.364 -1.5 -1.364s-1.5 .61 -1.5 1.364v4.136z"></path>
                </svg>
                <p className="card-title-options">Facilidad</p>
                <p className="card-para-options">Facil de postular, a distintos trabajos aquí.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div>

      </div>

      <div className='flex flex-col justify-center items-center text-center '>
        <div className="text-center ">
          <h1 className="font-bold text-4xl mb-4 text-slate-700">Todos los beneficos para ti</h1>
          <h1 className="text-3xl text-slate-700 pb-10">¡Que esperas se parte de nosotros!</h1>
        </div>
        <div >
        
                <div className='flex justify-center items-center'>

                    <div className="flex flex-col items-center bg-white rounded-lg md:flex-row md:max-w-4xl hover:bg-gray-100  dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img className="object-cover w-full h-auto rounded-t-lg md:w-96 md:rounded-none md:rounded-s-lg" src="https://img.freepik.com/vector-gratis/profesor-da-bienvenida-escuela_23-2148608158.jpg?t=st=1720458586~exp=1720462186~hmac=5e61d66b27a5e1ca1da06549358521efc633b7b5e697c62c0287284081e35963&w=740" alt="" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-joka font-madeTommy dark:text-white">Empleo para Docentes Profesionales</h5>
                            <p className="mb-3 text-lg font-normal text-gray-700 dark:text-gray-400 font-madeTommy">Ofrecemos un entorno de trabajo colaborativo y apoyo continuo para el desarrollo profesional. Nuestros profesores disfrutan de oportunidades de capacitación en metodologías educativas modernas y tecnología avanzada en el aula.</p>
                            <li className="flex items-center pt-1">
                                <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className=" leading-tight text-blue-joka dark:text-gray-400 ms-3 text-lg font-madeTommy">Equilibrio saludable entre vida laboral</span>
                            </li>
                            <li className="flex items-center pt-1">
                                <svg className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span className=" leading-tight text-blue-joka dark:text-gray-400 ms-3 text-lg font-madeTommy">Ambiente de trabajo positivo y productivo</span>
                            </li>
                        </div>
                    </div>

                </div>
        </div>
        <div >
          <div className='pt-10 text-4xl font-bold'>
            ¡Postula ahora!
          </div>
          <CarouselInicio />
        </div>


     

      </div>

      <div className=' flex justify-center gap-5 pb-10'>

        

      </div>
    </>

  )
}

export default Inicio