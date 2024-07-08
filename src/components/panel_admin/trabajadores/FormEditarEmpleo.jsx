import { useRef, useState, useEffect } from "react"
import useEmpleos from "../../../hooks/useEmpleos";
import useSedes from "../../../hooks/useSedes";
import Alerta from "../Alerta";
import { Input, Select, Option, Textarea } from "@material-tailwind/react";
import "../../../styles/File_Input.css"
import { uploadFile } from "../../../firebase/config";
import { Spinner } from "@material-tailwind/react";



const FormEditarEmpleo = ({ empleo }) => {

  const [isLoading, setIsLoading] = useState(false);

  const [titulo, setTitulo] = useState('')
  const [sede, setSede] = useState('')
  const [descripcion, setDescripcion] = useState('');
  const [salario, setSalario] = useState('');
  const [tipoEmpleo, setTipoEmpleo] = useState('');
  const [estado, setEstado] = useState('');


  const { mostrarAlerta, alerta, editarEmpleo } = useEmpleos();
  const {  sedes } = useSedes();




  // Actualizar los campos del formulario con los datos del cliente cuando clienteAEditar cambie
  useEffect(() => {
    if (empleo) {
      setTitulo(empleo.titulo);
      setSede(empleo.sede)
      setDescripcion(empleo.descripcion);
      setSalario(empleo.salario);
      setTipoEmpleo(empleo.tipo_empleo);
      setEstado(empleo.estado);
    }
  }, [empleo]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if ([titulo, descripcion, sede, salario, tipoEmpleo, estado].includes('')) {
        mostrarAlerta({
          msg: "Todos los campos son obligatorios",
          error: true
        })
        return
      }

      setIsLoading(true);

      // console.log(file);
      // console.log(linkImagen);
      await editarEmpleo({
        _id: empleo._id,
        titulo,
        descripcion,
        salario,
        tipoEmpleo,
        estado,
        sede
      })
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }

    setTitulo('')
    setDescripcion('')
    setSalario('')
    setTipoEmpleo('')
    setEstado('')
    setSede('')
  }

  const { msg } = alerta


  return (
    <form
      className="bg-white px-5   rounded-lg shadow "
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold py-2 text-orange-700">Editar Empleo</h2>
      <div className="bg-gray-300 w-full h-0.5"></div>
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-2 mt-5 ">

        <Input

          id="titulo"
          type="text"
          color="blue"
          label="Titulo"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />
      </div>

      <div className="flex  items-center gap-5">
        <div className="">
          <label htmlFor="sede" className="mb-2 text-sm  dark:text-white">Seleccionar Sede</label>
          <div className="w-44">
            <Select
              id="sede"
              color="orange"
              label="Select Sede"
              value={sede}
              onChange={e => setSede(e)}
            >
              {sedes.map((sede) => (
                <Option key={sede._id} value={sede.nombre}>
                  {sede.nombre}
                </Option>
              ))}

            </Select>
          </div>
        </div>
      </div>

      <div className="mb-2 mt-5 ">

        <Input

          id="salario"
          type="text"
          color="blue"
          label="Salario"
          value={salario}
          onChange={e => setSalario(e.target.value)}
        />
      </div>
      <div className="mb-2 mt-5 ">

        <Input

          id="tipoempleo"
          type="text"
          color="blue"
          label="Tipo de Empleo"
          value={tipoEmpleo}
          onChange={e => setTipoEmpleo(e.target.value)}
        />
      </div>
      <div className="mb-2 mt-5 ">

        <Input

          id="estado"
          type="text"
          color="blue"
          label="Estado"
          value={estado}
          onChange={e => setEstado(e.target.value)}
        />
      </div>

      <div className="mb-2 mt-2 ">
        <label
          className="text-sm"
          htmlFor="descripcion"
        >
          Descripcion del Empleo
        </label>
        <Textarea
          id="descripcion"
          type="text"
          color="orange"
          label="Descripción Opcional"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
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
        {isLoading ? "" : "Actualizar Empleo"}
      </button>
    </form>
  )
}

export default FormEditarEmpleo