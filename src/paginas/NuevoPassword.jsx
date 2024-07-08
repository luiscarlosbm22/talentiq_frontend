import { useState, useEffect, useContext } from "react"
import { Link, useParams} from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/panel_cliente/AlertaCliente"
import logofastfood from "../assets/logo-fast-food.png"
import bglogin from "../assets/bg-login.jpg"
import { Spinner } from "../components/panel_cliente/Spinner"
const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [esAdmin, setEsAdmin] = useState(false);
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const parms = useParams()
  const { token } = parms



  useEffect(() => {

    const comprobarToken = async () => {

      try {
        setIsLoading(true);
        const { data } = await clienteAxios(`/usuarios/olvide-password/${token}`);
        if (data.msg === "Token válido para cliente") {
          setEsAdmin(true);
          setTokenValido(true)
        } else if (data.msg === "Token válido para administrador") {
          setEsAdmin(false);
          setAlerta({
            msg: "Usuario sin permiso",
            error: true,
          });
        } else {
          setAlerta({
            msg: "Token no válido o usuario no válido",
            error: true,
          });
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
    comprobarToken()
  }, [])


  const handleSubmit = async e => {
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({
        msg: "El passowrd debe ser minimo de 6 caracteres",
        error: true
      })
      return
    }

    try {
      const url = `/usuarios/olvide-password/${token}`

      const { data } = await clienteAxios.post(url, { password })

      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)
    } catch (error) {
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
            <h1 className="mb-3 font-bold text-5xl">¡Bienvenido! Disfruta de la experiencia sin colas. </h1>
            <p className="pr-3">Llegar al cefetín y recibir tu comida favorita nunca había sido tan rápido, ingresa
              y disfruta de la experiencia</p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-semibold text-2xl text-slate-700">Nueva Contraseña </h3>
                <img src={logofastfood} alt="" className="w-22 h-10" />
              </div>

              <p className="text-gray-500">Ingresa tu Nueva Contraseña.</p>
            </div>
            {msg && <Alerta alerta={alerta} />}

            {tokenValido && (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">Nueva Contraseña Aquí</label>
                <input
                  className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                  type="password"
                  placeholder="Ingresa tu Nueva Contraseña"
                  value={password}
                  required
                  id="password"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-800">
                    ¿Ya tienes una cuenta?
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/login" className="text-orange-700 font-semibold hover:text-orange-500">
                    Inicia Sesión
                  </Link>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-orange-600  hover:bg-orange-600 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <div className="">
                      <Spinner />
                    </div>
                  )}
                  {isLoading ? "" : "Guardar Nueva Contraseña"}
                </button>
              </div>
            </form>
            )}
            {passwordModificado && (

            <div className="pt-5 text-center text-gray-400 text-xs">
            <Link
              className="block text-center font-bold my-5 text-blue-600 uppercase text-sm"
              to="/login"
            >Iniciar Sesión</Link>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoPassword