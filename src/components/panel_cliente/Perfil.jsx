
import useAuth from "../../hooks/useAuth"
import useSedes from '../../hooks/useSedes';
import {
  Avatar,
} from "@material-tailwind/react";

const Perfil = () => {
  const { sedes } = useSedes();
  const { auth, cerrarSesionAuth } = useAuth()
  const { cerrarSesionSedes } = useSedes()


  const handleCerrarSesion = () => {
    cerrarSesionAuth()
    cerrarSesionSedes()
    //cerrarSesionBlogs()
    localStorage.removeItem('token')
  }

  // Obtener la fecha actual del usuario y formatearla
  const createdAtDate = new Date(auth.createdAt);
  // Extraer los componentes de fecha necesarios
  const dia = createdAtDate.getDate();
  const mes = createdAtDate.getMonth() + 1; // Sumar 1 porque los meses comienzan en 0
  const año = createdAtDate.getFullYear();
  const horas = createdAtDate.getHours();
  const minutos = createdAtDate.getMinutes();

  // Formatear la fecha y hora según tu requisito
  const fechaFormateada = `${dia}/${mes}/${año}`;
  const horaFormateada = `${horas}:${minutos}`;


  return (
    <div>

      <section className=" ">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-12">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative flex justify-center items-center">
                  
                    <Avatar
                      src="https://cdn-icons-png.flaticon.com/512/320/320333.png"
                      alt={auth.nombres}
                      size="md"
                      className="shadow-xl rounded-full h-auto align-middle border-none  -m-16 w-52 lg:-ml-16 max-w-150-px"
                    />
                  </div>


                </div>

                <div className="text-center mt-12 flex flex-col justify-center items-center ">

                  <h3 className="text-xl font-semibold leading-normal text-gray-800  ">
                    {auth.nombres} {auth.apellidos}
                  </h3>
                  


                </div>
                <div className="w-full   flex flex-col gap-2 ">
                  <div className="flex text-sm font-semibold justify-between  items-center bg-white shadow-sm  shadow-gray-500 p-2 rounded-lg">
                    <h1 className="text-orange-700">Email</h1>
                    <p className="bg-orange-700 p-1 rounded-lg text-white">{auth.email}</p>
                  </div>
                  <div className="flex text-sm font-semibold justify-between  items-center bg-white shadow-sm  shadow-gray-500 p-2 rounded-lg">
                    <h1 className="text-orange-700">Creado el </h1>
                    <p className="bg-orange-700 p-1 pr-5 pl-5 rounded-lg text-white">{fechaFormateada} - {horaFormateada}</p>
                  </div>
                  <div className="flex text-sm font-semibold justify-between  items-center bg-white shadow-sm  shadow-gray-500 p-2 rounded-lg">
                    <h1 className="text-orange-700">Estado de cuenta</h1>
                    <p className="bg-orange-700 p-1 pr-5 pl-5 rounded-lg text-white">{auth.estado}</p>
                  </div>

                </div>
              </div>

              <div className="mt-4 pb-5 pt-1 border-t border-gray-300 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 ">
                    <p className="mb-4 text-sm leading-relaxed text-blueGray-700">
                      Se parte de <span className="text-orange-800">nosotros</span> los mejores profesionales estan aquí
                    </p>
                    <button onClick={handleCerrarSesion} className="font-normal text-white bg-orange-700 p-2 rounded-lg">
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
      <div className="pb-10"></div>
    </div>
  )
}

export default Perfil