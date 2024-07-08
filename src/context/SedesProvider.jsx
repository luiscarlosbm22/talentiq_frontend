import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify"

const SedesContext = createContext();

const SedesProvider = ({ children }) => {

    const [sedes, setSedes] = useState([]);
    const [sedesPublic, setSedesPublic] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [sede, setSede] = useState({});
    const [cargando, setCargando] = useState(false);

    const {auth} = useAuth();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return; // Si no hay token, no hacemos la llamada a la API

        const obtenerSedes = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                
                const { data } = await clienteAxios.get('/sedes', config);
                setSedes(data);
                
            } catch (error) {
                console.log(error);
            }
        };
        obtenerSedes();
    }, [auth]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return; // Si no hay token, no hacemos la llamada a la API

        const obtenerSedesPublic = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                
                const { data } = await clienteAxios.get('/sedes/public', config);
                setSedesPublic(data);
                
            } catch (error) {
                console.log(error);
            }
        };
        obtenerSedesPublic();
    }, [auth]);
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return; // Si no hay token, no hacemos la llamada a la API

        const obtenerSedesAdmin = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                
                const { data } = await clienteAxios.get('/sedes/sed', config);
                setSedes(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerSedesAdmin();
    }, [auth]);


    const editarSede = async sede => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/sedes/editar-sede/${sede._id}`, sede, config)

            //Sincronizar el State
            const sedesActualizados = sedes.map(sedeState => sedeState._id === data._id ? data : sedeState)
            setSedes(sedesActualizados)

            setAlerta({
                msg: 'Sede Actualizado Correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);


        } catch (error) {
            console.log(error);
        }
    }

    const eliminarSede = async sede => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            await clienteAxios.delete(`/sedes/eliminar-sede/${sede._id}`, config)

            // Elimina el cliente del estado local
            const sedesActualizados = sedes.filter(sedeState => sedeState._id !== sede._id);
            setSedes(sedesActualizados);

            toast.success('Sede Eliminado Correctamente');


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

    const submitSede = async sede => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/sedes', sede, config)

            setSedes([...sedes, data])

            setAlerta({
                msg: "Sede creado Correctamente",
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const obtenerSedePublico = async id => {
        setCargando(true);

        try {

            const { data } = await clienteAxios(`/sedes/${id}`)
            setSede(data)


        } catch (error) {
            console.log(error);
        } finally {
            setCargando(false)
        }

    }

    const cerrarSesionSedes = () => {
        setSedes([])
        sedesPublic([])
        setSede({})
        setAlerta({})
    }

    return (
        <SedesContext.Provider
            value={{
                sedes,
                setSede,
                setSedes,
                mostrarAlerta,
                alerta,
                submitSede,
                obtenerSedePublico,
                setSede,
                sede,
                cargando,
                cerrarSesionSedes,
                editarSede,
                eliminarSede,
                sedesPublic,

            }}
        >{children}</SedesContext.Provider>
    )
}

export {
    SedesProvider
}
export default SedesContext;
