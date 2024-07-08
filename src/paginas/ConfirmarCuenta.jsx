
import logofastfood from "../assets/logo-fast-food.png"
import bglogin from "../assets/bg-login.jpg"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/panel_cliente/AlertaCliente"


const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams();
  const { id } = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`
        const { data } = await clienteAxios(url)

        setAlerta({
          msg: data.msg,
          error: false
        })

        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta();
  }, [])

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
                <h3 className="font-semibold text-2xl text-slate-700">Confirma tu Cuenta ahora </h3>
                <img src={logofastfood} alt="" className="w-22 h-10" />
              </div>


            </div>
            <div>
              {msg && <Alerta alerta={alerta} />}


              {cuentaConfirmada && (
                <Link
                  className="block text-center my-5 text-blue-600 uppercase text-sm"
                  to="/login"
                >Iniciar Sesión</Link>
              )}
            </div>

            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>
                Llega y Disfruta con
                <a href="https://codepen.io/uidesignhub" rel="" target="_blank" title="Ajimon" className="text-orange hover:text-orange-500 "> FastFood</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmarCuenta