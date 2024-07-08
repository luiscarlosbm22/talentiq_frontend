import "../styles/LoginAdmin.css"
import fastfoodwhite from "../assets/FastFood-White2.png"
import { useState } from "react"
import { Link} from "react-router-dom"
import Alerta from "../components/panel_cliente/AlertaCliente"
import clienteAxios from "../config/clienteAxios"



const OlvidePasswordAdmin = () => {

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})


  const handleSubmit = async e => {
    e.preventDefault()
    if (email === '' || email.length < 6) {
      setAlerta({
        msg: 'El email es obligatorio',
        error: true
      });
      return
    }
    try {
      const { data } = await clienteAxios.post(`/usuarios/admin/olvide-password`, { email })
      setAlerta({
        msg: data.msg,
        error: false
      });


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
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Ingresa Email</label>
            <input
              type="email"
              name="username"
              id="username"
              placeholder="admin@fastfood.pe"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            className="w-full block bg-gradient-to-r from-orange-700 to-orange-900 hover:to-orange-700 hover:from-orange-500 focus:to-orange-900 text-white font-semibold rounded-lg px-4 py-3 mt-6 cursor-pointer"
            value="Enviar Instrucciones"
          />
        </form>
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

export default OlvidePasswordAdmin