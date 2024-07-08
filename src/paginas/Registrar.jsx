import logofastfood from "../assets/logo-fast-food.png"
import bglogin from "../assets/bg-login.jpg"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"
import { Spinner } from "../components/panel_cliente/Spinner"

const Registrar = () => {
  
  const [nombres, setNombres] = useState('') 
  const [apellidos, setApellidos] = useState('') 
  const [email, setEmail] = useState('')
  // const [codigo_utp, setCodigoUtp] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [cargando, setCargando] = useState(false)
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async e => {
    e.preventDefault();

    if ([email, nombres, apellidos, repetirPassword, password].includes('')) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      });

      return
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: "Las contraseñas no son iguales",
        error: true
      });
      return
    }
    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña es muy corta, agrega minimo 6 caracteres",
        error: true
      });

      return
    }
    setAlerta({})

    try {
      setIsLoading(true);
      const { data } = await clienteAxios.post('/usuarios/cliente', { nombres, apellidos, email, password })
      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombres('')
      setApellidos('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
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
          <h1 className="mb-3 font-bold text-5xl">¡Regístrate! Y Obten el Control Total de tu Nogocio.</h1>
          <p className="pr-3">Despacha tus pedidos de la forma más rápida, ingresa
            y disfruta de la experiencia en tiempo real.</p>
        </div>
      </div>
      <div className="flex justify-center self-center  z-10">
        <div className="pr-12 pl-12 pt-1 pb-1 bg-white mx-auto rounded-2xl w-100 ">
          <div className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold text-2xl text-slate-700">Regístrate</h3>
              <img src={logofastfood} alt="" className="w-22 h-10" />
            </div>

            <p className="text-gray-500">Crea tu cuenta y disfruta</p>
          </div>
          {msg && <Alerta alerta={alerta} />}
          <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="">
              <label className="text-sm font-medium text-gray-700 tracking-wide">Nombres</label>
              <input
                className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                type="text"
                placeholder="Ingresa tu nombre"
                value={nombres}
                id="nombres"
                onChange={e => setNombres(e.target.value)}
              />
            </div>
            <div className="">
              <label className="text-sm font-medium text-gray-700 tracking-wide">Apellidos</label>
              <input
                className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                type="text"
                placeholder="Ingresa tu apellido"
                value={apellidos}
                id="apellidos"
                onChange={e => setApellidos(e.target.value)}
              />
            </div>
           
            <div className="">
              <label className="text-sm font-medium text-gray-700 tracking-wide">Email</label>
              <input
                className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                type="email"
                placeholder="ejemplo@gmail.com"
                value={email}
                id="codigoutp"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="">
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
            <div className="">
              <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                Repetir Contraseña
              </label>
              <input
                className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                type="password"
                id="repetirpassword"
                placeholder="Confirma tu contraseña"
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
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
                <Link to="/login" className="text-orange-400 hover:text-orange-500">
                  ¿Ya Tienes una Cuenta?
                </Link>
              </div>
            </div>
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
                {isLoading ? "" : "Registrarme"}
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

export default Registrar