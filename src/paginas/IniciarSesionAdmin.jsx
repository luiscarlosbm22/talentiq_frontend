
import "../styles/LoginAdmin.css"
import logomeganet from "../assets/logo-meganet.webp"
import fastfoodwhite from "../assets/logo_talent_iq.png"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/panel_admin/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"

import { useContext, useEffect } from 'react';
import AuthContext from "../context/AuthProvider"



const IniciarSesionAdmin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const [cargando, setCargando] = useState(false)

    const { auth } = useContext(AuthContext);

    const { setAuth } = useAuth();
    const navigate = useNavigate();



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
            const { data } = await clienteAxios.post('/usuarios/login', { email, password })
            setAlerta({})
            // Comprobación adicional antes de redirigir y guardar el token
            if (data.__t === 'Admin') {
                localStorage.setItem('token', data.token);
                setAuth(data);
                navigate('/panel-admin');
          

            } else if (data.__t === 'Cliente') {
                console.log('Usuario no permitido');
            } else {
                console.log('Tipo de usuario desconocido');
            }

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })

        }
    }


    const { msg } = alerta
    return (
        <div className=''>

            <div className='main-form-content'>
                <div className="form-container ">
                    <div className='flex justify-center items-center flex-col gap-1'>
                        <img src={fastfoodwhite} alt="" className='w-24  ' />
                        <p className="title text-orange-800">Admin Login</p>
                    </div>
                    {msg && <Alerta alerta={alerta} />}
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Email</label>
                            <input
                                type="email"
                                name="username"
                                id="username"
                                placeholder="admin@fastfood.pe"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
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
                        <input type="submit" className="w-full block bg-gradient-to-r from-orange-700 to-orange-900 hover:to-orange-700 hover:from-orange-500 focus:to-orange-900 text-white font-semibold rounded-lg px-4 py-3 mt-6 cursor-pointer" value="Iniciar Sesión" />
                    </form>
                    <div className="social-message">
                        <div className="line"></div>
                        <p className="message">Esta espacio es solo para Admins</p>
                        <div className="line"></div>
                    </div>
                    <p className="signup">Olvidaste tu Contraseña?
                        <Link rel="noopener noreferrer" to="/adminlogin/olvide-password" className=""> Recuperala aqui</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default IniciarSesionAdmin