import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify"

const EmpleosContext = createContext();

const EmpleosProvider = ({ children }) => {

    const [empleos, setEmpleos] = useState([]);
    const [empleosPublic, setEmpleosPublic] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [empleo, setEmpleo] = useState({});
    const [cargando, setCargando] = useState(false);

    const { auth } = useAuth();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return; // Si no hay token, no hacemos la llamada a la API

        const obtenerEmpleosPublic = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await clienteAxios.get('/empleos/public', config);

                // Asegúrate de que cada empleo tiene un array de postulantes
                const empleosConPostulantes = data.map(empleo => ({
                    ...empleo,
                    postulantes: empleo.postulantes || []
                }));
                setEmpleosPublic(empleosConPostulantes);


            } catch (error) {
                console.log(error);
            }
        };
        obtenerEmpleosPublic();
    }, [auth]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return; // Si no hay token, no hacemos la llamada a la API

        const obtenerEmpleos = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await clienteAxios.get('/empleos', config);

                // Asegúrate de que cada empleo tiene un array de postulantes
                const empleosConPostulantes = data.map(empleo => ({
                    ...empleo,
                    postulantes: empleo.postulantes || []
                }));

                setEmpleos(empleosConPostulantes);

            } catch (error) {
                console.log(error);
            }
        };
        obtenerEmpleos();
    }, [auth]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return; // Si no hay token, no hacemos la llamada a la API

        const obtenerEmpleosAdmin = async () => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await clienteAxios.get('/empleos/emp', config);

                 // Asegúrate de que cada empleo tiene un array de postulantes
                 const empleosConPostulantes = data.map(empleo => ({
                    ...empleo,
                    postulantes: empleo.postulantes || []
                }));
                setEmpleos(empleosConPostulantes);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerEmpleosAdmin();
    }, [auth]);


    const editarEmpleo = async empleo => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/empleos/editar-empleo/${empleo._id}`, empleo, config)

            //Sincronizar el State
            const empleosActualizados = empleos.map(empleoState => empleoState._id === data._id ? data : empleoState)
            setEmpleos(empleosActualizados)

            setAlerta({
                msg: 'Empleo Actualizado Correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);


        } catch (error) {
            console.log(error);
        }
    }

    const eliminarEmpleo = async empleo => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            await clienteAxios.delete(`/empleos/eliminar-empleo/${empleo._id}`, config)

            // Elimina el cliente del estado local
            const empleosActualizados = empleos.filter(empleoState => empleoState._id !== empleo._id);
            setEmpleos(empleosActualizados);

            toast.success('Empleo Eliminado Correctamente');


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

    const submitEmpleo = async empleo => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/empleos', empleo, config)

            setEmpleos([...empleos, data])

            setAlerta({
                msg: "Empleo creado Correctamente",
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const postularEmpleo = async ({ empleoId, usuarioId, nombres, apellidos, email, cvUrl, cvText }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
    
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
    
            const response = await clienteAxios.post(`/postulacion/enviar/${empleoId}`, {
                usuarioId,
                nombres,
                apellidos,
                email,
                cvUrl,
                cvText // Añadir el texto del CV
            }, config);
    
            return response.data;
        } catch (error) {
            console.error('Error postulando al empleo:', error);
            throw error;
        }
    };
    



    const obtenerEmpleoPublico = async id => {
        setCargando(true);

        try {

            const { data } = await clienteAxios(`/empleos/${id}`)
            setEmpleo(data)
        } catch (error) {
            console.log(error);
        } finally {
            setCargando(false)
        }

    }

    const cerrarSesionEmpleos = () => {
        setEmpleos([])
        setEmpleo({})
        setAlerta({})
        setEmpleosPublic([])
    }

    return (
        <EmpleosContext.Provider
            value={{
                empleos,
                empleosPublic,
                setEmpleos,
                mostrarAlerta,
                alerta,
                submitEmpleo,
                obtenerEmpleoPublico,
                setEmpleo,
                empleo,
                cargando,
                cerrarSesionEmpleos,
                editarEmpleo,
                eliminarEmpleo,
                postularEmpleo

            }}
        >{children}</EmpleosContext.Provider>
    )
}

export {
    EmpleosProvider
}
export default EmpleosContext;
