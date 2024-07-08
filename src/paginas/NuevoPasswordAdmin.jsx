import { useState, useEffect, useContext } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/panel_cliente/AlertaCliente"

import fastfoodwhite from "../assets/FastFood-White2.png"

const NuevoPasswordAdmin = () => {

  const [password, setPassword] = useState('')
  const [esAdmin, setEsAdmin] = useState(false);
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado] = useState(false)

  const parms = useParams()
  const { token } = parms


  useEffect(() => {


    const comprobarToken = async () => {


      try {
        const { data } = await clienteAxios(`/usuarios/olvide-password/${token}`);
        if (data.msg === "Token válido para administrador") {
          setEsAdmin(true);
          setTokenValido(true)
        } else if (data.msg === "Token válido para cliente") {
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

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  }, []);




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
    <div className='main-form-content'>
      <div className="form-container ">
        <div className='flex justify-center items-center flex-col gap-1'>
          <img src={fastfoodwhite} alt="" className='w-24 ' />
          <p className="title text-orange-800">Admin</p>
        </div>
        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="************"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div className="forgot">
              </div>
            </div>

            <input
              type="submit"
              className="w-full block bg-gradient-to-r from-orange-700 to-orange-900 hover:to-orange-700 hover:from-orange-500 focus:to-orange-900 text-white font-semibold rounded-lg px-4 py-3 mt-6 cursor-pointer"
              value="Reestablecer Contraseña"
            />
          </form>
        )}
        <div className="social-message">
          <div className="line"></div>
          <p className="message">Esta espacio es solo para Admins</p>
          <div className="line"></div>
        </div>
        <p className="signup">Ya eres Admin?
          <Link rel="noopener noreferrer" to="/adminlogin" className=""> Inicia Sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default NuevoPasswordAdmin