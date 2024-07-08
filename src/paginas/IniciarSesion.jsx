
import logofastfood from "../assets/logo-fast-food.png"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"
import useProductos from "../hooks/useSedes"
import bglogin from "../assets/bg-login.jpg"



import { useContext, useEffect } from 'react';
import AuthContext from "../context/AuthProvider"
import ProductosContext from "../context/SedesProvider"

import { Spinner } from "../components/panel_cliente/Spinner"
const IniciarSesion = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [cargando, setCargando] = useState(false)
  const [isLoading, setIsLoading] = useState(false);



  const { auth } = useContext(AuthContext);


  const { setAuth } = useAuth();



  const navigate = useNavigate()

  useEffect(() => {
    if (auth._id && auth.__t === 'Cliente') {
      navigate('/cliente');
    } else if (auth._id && auth.__t === 'Admin') {
      navigate('/panel-admin');
      //console.log("Llevando a Login Admin");
    }
  }, [auth, navigate]);



  const handleSubmit = async e => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      });

      return
    }

    try {
      setIsLoading(true);
      const { data } = await clienteAxios.post('/usuarios/login', { email, password })

      setAlerta({})
      //console.log(data);

      // Comprobación adicional antes de redirigir y guardar el token
      if (data.__t === 'Cliente') {
        localStorage.setItem('token', data.token);
        setAuth(data);
        navigate('/cliente');
        
        

      } else if (data.__t === 'Admin') {
        console.log('Usuario no permitido');
      } else {
        console.log('Tipo de usuario desconocido');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })

    }
  }


  const { msg } = alerta

  return (

    <div className="bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: `url("${bglogin}")` }}><div className="absolute  bg-gradient-to-b from-orange-700 to-gray-900  opacity-60 inset-0 z-0 hidden md:block"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            <img src="" className="mb-3" />
            <h1 className="mb-3 font-bold text-5xl">¡Postula! al mejor colegio como docente profesional.</h1>
            <p className="pr-3">Inicia Sesion para encontrar todos los trabajos disponibles</p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-semibold text-2xl text-slate-700">Iniciar Sesión </h3>
                <img src={logofastfood} alt="" className="w-22 h-10" />
              </div>

              <p className="text-gray-500">Por favor inicie sesión en su cuenta.</p>
            </div>
            {msg && <Alerta alerta={alerta} />}
            <form className="space-y-2" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                <input
                  className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                  type="text"
                  placeholder="Ingresa tu Email"
                  value={email}
                  id="codigoempleado"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Contraseña
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                  type="password"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-800">
                    Recordarme
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/login/olvide-password" className="text-orange-400 hover:text-orange-500">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                
              </div>
              {/* <div className="text-sm">
                  <Link to="/login/registrar" className="text-orange-400 hover:text-orange-500">
                    Regístrate aquí
                  </Link>
                </div> */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-orange-500  hover:bg-orange-600 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <div className="">
                      <Spinner />
                    </div>
                  )}
                  {isLoading ? "" : "Iniciar Sesión"}
                </button>
              </div>
            </form>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>
                Buscamos el mejor
                <a href="https://codepen.io/uidesignhub" rel="" target="_blank" title="Ajimon" className="text-orange hover:text-orange-500 "> TalentIQ</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default IniciarSesion