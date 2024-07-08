import { useRef, useState, useEffect } from "react"
import useSedes from "../../../hooks/useSedes";
import Alerta from "../Alerta";
import { Input, Select, Option, Textarea } from "@material-tailwind/react";
import "../../../styles/File_Input.css"
import { uploadFile } from "../../../firebase/config";
import { Spinner } from "@material-tailwind/react";



const FormEditarSede = ({ sede }) => {

    const [isLoading, setIsLoading] = useState(false);

    const [nombre, setNombre] = useState('')
    const [linkImagen, setLinkImagen] = useState('')
    const [direccion, setDireccion] = useState('')
    const [director, setDirector] = useState('')
    const [file, setFile] = useState(null)


    const { mostrarAlerta, alerta, editarSede } = useSedes();




    // Actualizar los campos del formulario con los datos del cliente cuando clienteAEditar cambie
    useEffect(() => {
        if (sede) {
          setNombre(sede.nombre);
          setDireccion(sede.direccion);
          setDirector(sede.director);
          setLinkImagen(sede.linkImagen);
        }
      }, [sede]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if ([nombre, direccion, director].includes('')) {
                mostrarAlerta({
                    msg: "Todos los campos son obligatorios",
                    error: true
                })
                return
            }
           
            setIsLoading(true);

            let newLinkImagen = linkImagen; // Por defecto, mantener la misma imagen
            if (file !== null) {
                newLinkImagen = await uploadFile(file); // Solo actualizar si se selecciona una nueva imagen
            }
            // console.log(file);
            // console.log(linkImagen);
            await editarSede({ 
                _id: sede._id,
                nombre, 
                direccion, 
                linkImagen: newLinkImagen,
                director
            })
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }

        setNombre('')
        setDireccion('')
        setDirector('')
        setFile(null)


    }

    const { msg } = alerta


    return (
        <form
            className="bg-white px-5   rounded-lg shadow "
            onSubmit={handleSubmit}
        >
            <h2 className="text-xl font-bold py-2 text-orange-700">Editar Sede</h2>
            <div className="bg-gray-300 w-full h-0.5"></div>
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-2 mt-5 ">
              
                <Input

                    id="nombre"
                    type="text"
                    color="blue"
                    label="Nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
        
            <div className="mb-2 mt-5 ">
              
              <Input

                  id="direccion"
                  type="text"
                  color="blue"
                  label="lnt9 - Lima"
                  value={direccion}
                  onChange={e => setDireccion(e.target.value)}
              />
          </div>
          <div className="mb-2 mt-5 ">
              
                <Input

                    id="director"
                    type="text"
                    color="blue"
                    label="Nombre de Director"
                    value={director}
                    onChange={e => setDirector(e.target.value)}
                />
            </div>


            <div className="mb-5  ">
                <div>
                    <label
                        className="text-sm"
                        htmlFor="file_input"
                    >
                        Imagen del Producto
                    </label>
                </div>
                <div className="border-2 rounded-lg ">
                    <input
                        id="file_input"
                        type="file"
                        
                        placeholder="Imagen del Producto"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                   
                </div>
            </div>


            <button
                type="submit"

                disabled={isLoading}
                className="bg-orange-600 w-full p-2 mb-2 uppercase font-bold text-white rounded-lg cursor-pointer hover:bg-orange-700"

            >
                {isLoading && (
                    <div className="flex justify-center items-center">
                        <Spinner color="white" />
                    </div>
                )}
                {isLoading ? "" : "Actualizar Sede"}
            </button>
        </form>
    )
}

export default FormEditarSede