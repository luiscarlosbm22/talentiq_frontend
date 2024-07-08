import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import { toast } from "react-toastify"




const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    const [usuarios, setUsuarios] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [alerta, setAlerta] = useState({});


    const navigate = useNavigate()





    useEffect(() => {

        const autenticarUsuario = async () => {

            const token = localStorage.getItem('token')

            if (!token) {
                setCargando(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {

                const { data } = await clienteAxios('/usuarios/perfil', config)

                setAuth(data)
                
               


            } catch (error) {
                setAuth({})


            }
            setCargando(false)

        }

        autenticarUsuario()

    }, []);

    const obtenerClientes = async (token) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await clienteAxios.get('/usuarios/obtener-clientes', config);
            setClientes(data);
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return; // Si no hay token, no hacemos la llamada a la API
    
        obtenerClientes(token);
    }, [auth]);
    

    const editarCliente = async cliente => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/usuarios/editar-cliente/${cliente._id}`, cliente, config)

            //Sincronizar el State
            // const clientesActualizados = clientes.map(clienteState => clienteState._id === data._id ? data : clienteState)
            // setClientes(clientesActualizados)

            await obtenerClientes(token)
            toast.success('Trabajador Actualizado Correctamente');

            // setAlerta({
            //     msg: 'Cliente Actualizado Correctamente',
            //     error: false
            // })
            // setTimeout(() => {
            //     setAlerta({})
            // }, 3000);


        } catch (error) {
            console.log(error);
        }
    }

    const eliminarCliente = async cliente => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            await clienteAxios.delete(`/usuarios/eliminar-cliente/${cliente._id}`, config)

            // Elimina el cliente del estado local
            const clientesActualizados = clientes.filter(clienteState => clienteState._id !== cliente._id);
            setClientes(clientesActualizados);

            toast.success('Cliente Eliminado Correctamente');


        } catch (error) {
            console.log(error);
        }
    }


    const submitTrabajador = async usuario => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/usuarios/cliente', usuario, config)

            setUsuarios([...usuarios, data])

            setAlerta({
                msg: "Usuario creado Correctamente",
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }
    const mostrarAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const cerrarSesionAuth = () => {
        setAuth({})
        setUsuarios([])
        setClientes([])

        localStorage.removeItem('token')
    }



    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth,
                setUsuarios,
                submitTrabajador,
                alerta,
                mostrarAlerta,
                clientes,
                setClientes,
                editarCliente,
                eliminarCliente
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext