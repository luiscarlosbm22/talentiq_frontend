
import {
  Avatar,
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
  List,
  ListItem,
  ListItemPrefix,

} from "@material-tailwind/react";
import { HomeIcon, BellIcon } from "@heroicons/react/24/solid";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"
import "../../styles/PanelCliente/Scroll.css"
import useSedes from "../../hooks/useSedes";



const HeaderCliente = () => {

  const { auth, cerrarSesionAuth } = useAuth()
  const { cerrarSesionSedes } = useSedes()

  const handleCerrarSesion = () => {
    cerrarSesionAuth()
    cerrarSesionSedes()
    //cerrarSesionBlogs()
    localStorage.removeItem('token')
  }


  // Crear un nuevo objeto Date con la cadena de fecha
  const createdAtDate = new Date(auth.createdAt);

  // Obtener los componentes de la fecha
  const dia = createdAtDate.getDate();
  const mes = createdAtDate.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
  const anio = createdAtDate.getFullYear();

  // Obtener los componentes de la hora
  const hora = createdAtDate.getHours();
  const minutos = createdAtDate.getMinutes();
  const segundos = createdAtDate.getSeconds();

  // Formatear la fecha en el formato deseado (por ejemplo, DD/MM/YYYY HH:MM:SS)
  const fechaFormateada = `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;


  return (
    <header className="px-4 py-3 bg-orange-500 ">
      <div className=" flex md:flex gap-2 md:justify-between">
        <h2 className=" text-lg md:text-4xl text-white font-black text-center leading-3 md:leading-6">
          Talent <br /> IQ
        </h2>


        <div className="rounded-lg lg:W-96 md:w-96 w-40 h-5 block  ">

        </div>
        <div className=" flex items-center gap-4">

          <Popover
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <PopoverHandler>

              <div className="bg-white p-1 rounded-md cursor-pointer hover:bg-orange-800">
                <Avatar
                  src="https://cdn-icons-png.flaticon.com/512/320/320333.png"
                  alt={auth.nombres}
                  size="md"
                  className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain w-8 h-8"
                />
              </div>

            </PopoverHandler>
            <PopoverContent className="w-72">
              <div className="mb-4 flex items-center gap-4 border-b border-blue-gray-50 pb-4">
                <Avatar
                  src="https://cdn-icons-png.flaticon.com/512/320/320333.png"
                  alt={auth.nombres}
                  size="md"
                  className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain"
                />
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {auth.nombres} {auth.apellidos}
                  </Typography>
                
                </div>
              </div>
              <List className="p-0">
                <a href="#" className="text-initial font-medium text-blue-gray-500">
                  <ListItem>
                    <ListItemPrefix>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.00299 5.884L9.99999 9.882L17.997 5.884C17.9674 5.37444 17.7441 4.89549 17.3728 4.54523C17.0015 4.19497 16.5104 3.99991 16 4H3.99999C3.48958 3.99991 2.99844 4.19497 2.62717 4.54523C2.2559 4.89549 2.03259 5.37444 2.00299 5.884Z"
                          fill="#90A4AE"
                        />
                        <path
                          d="M18 8.11798L10 12.118L2 8.11798V14C2 14.5304 2.21071 15.0391 2.58579 15.4142C2.96086 15.7893 3.46957 16 4 16H16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V8.11798Z"
                          fill="#90A4AE"
                        />
                      </svg>
                    </ListItemPrefix>
                    {auth.email}
                  </ListItem>
                </a>
                <a href="#" className="text-initial font-medium text-blue-gray-500">
                  <ListItem>
                    <ListItemPrefix>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-checkbox">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 11l3 3l8 -8" />
                        <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                      </svg>
                    </ListItemPrefix>
                    {auth.confirmado ? (
                      <span className="text-green-500">Activo</span>
                    ) : (
                      <span className="text-yellow-500">Inactivo</span>
                    )}
                  </ListItem>
                </a>
                <a href="#" className="text-initial font-medium text-blue-gray-500">
                  <ListItem>
                    <ListItemPrefix>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-due">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                        <path d="M16 3v4" />
                        <path d="M8 3v4" />
                        <path d="M4 11h16" />
                        <path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                      </svg>
                    </ListItemPrefix>
                    <div className="flex flex-col">
                      <span className="tex-xs text-gray-800">Creado el</span>
                      <span>{fechaFormateada}</span>
                    </div>

                  </ListItem>
                </a>
                <button onClick={handleCerrarSesion} className="text-initial font-medium text-blue-gray-500">
                  <ListItem>
                    <ListItemPrefix>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5A.75.75 0 0 1 10 2ZM5.404 4.343a.75.75 0 0 1 0 1.06 6.5 6.5 0 1 0 9.192 0 .75.75 0 1 1 1.06-1.06 8 8 0 1 1-11.313 0 .75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                      </svg>

                    </ListItemPrefix>
                    Cerrar Sesión
                  </ListItem>
                </button>
              </List>
            </PopoverContent>
          </Popover>


          <div className="hidden md:block">
            <Typography variant="h6" color="black"> {auth.nombres} {auth.apellidos}</Typography>
            <Typography variant="small" color="white" className="font-normal">
              {auth.email}
            </Typography>
          </div>
        </div>

      </div>
    </header>
  )
}

export default HeaderCliente