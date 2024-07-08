import { useRef, useState } from "react"
import useSedes from "../../../hooks/useSedes";
import Alerta from "../Alerta";
import { Input, Select, Option, Textarea } from "@material-tailwind/react";
import "../../../styles/File_Input.css"
import { uploadFile } from "../../../firebase/config";
import { Spinner } from "@material-tailwind/react";



const FormularioSede = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [director, setDirector] = useState('')
    const [file, setFile] = useState(null)
    const { mostrarAlerta, alerta, submitSede } = useSedes();


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
            if (file === null) {
                mostrarAlerta({
                    msg: "Por favor seleccione una imagen",
                    error: true
                })
                return
            }


            setIsLoading(true);

            const linkImagen = await uploadFile(file);
            // console.log(file);
            // console.log(linkImagen);
            await submitSede({ nombre, direccion, director, linkImagen })
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
            className="bg-white px-5   rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            <h2 className="text-xl font-bold py-2 text-orange-700">Crear Nuevo Producto</h2>
            <div className="bg-gray-300 w-full h-0.5"></div>
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-2 mt-1">
                <label
                    className="text-sm"
                    htmlFor="nombre"
                >
                    Nombre de Sede
                </label>
                <Input
                    id="nombre"
                    type="text"
                    color="orange"
                    label="Nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            

            <div className="mb-2 mt-1">
                <label
                    className="text-sm"
                    htmlFor="direccion"
                >
                    Dirección
                </label>
                <Input
                    id="direccion"
                    type="text"
                    color="orange"
                    label="lima - DTS"
                    value={direccion}
                    onChange={e => setDireccion(e.target.value)}
                />
            </div>

            <div className="mb-2 mt-1">
                <label
                    className="text-sm"
                    htmlFor="direccion"
                >
                    Director
                </label>
                <Input
                    id="director"
                    type="text"
                    color="orange"
                    label="director de sede"
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
                        Imagen de la Sede
                    </label>
                </div>
                <div className="border-2 rounded-lg ">
                    <input
                        id="file_input"
                        type="file"

                        placeholder="Imagen de Sede"
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
                {isLoading ? "" : "Crear Sede"}
            </button>
        </form>
    )
}

export default FormularioSede