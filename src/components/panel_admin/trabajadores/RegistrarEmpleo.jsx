
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../../Alerta"
import useSedes from "../../../hooks/useSedes";
import clienteAxios from "../../../config/clienteAxios"
import { Input, Select, Option, Textarea } from "@material-tailwind/react";
import { Spinner } from "../../panel_cliente/Spinner"
import useEmpleos from "../../../hooks/useEmpleos"

const RegistrarEmpleo = () => {

  const [titulo, setTitulo] = useState('')
  const [sede, setSede] = useState('')
  const [descripcion, setDescripcion] = useState('');
  const [salario, setSalario] = useState('');
  const [tipo_empleo, setTipoEmpleo] = useState('');
  const [estado, setEstado] = useState('');

  const [cargando, setCargando] = useState(false)
  const [isLoading, setIsLoading] = useState(false);


  const { mostrarAlerta, alerta, submitEmpleo } = useEmpleos();
  const {  sedes } = useSedes();

  const handleSubmit = async e => {
    e.preventDefault();

    if ([titulo, descripcion,sede, salario, tipo_empleo, estado].includes('')) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      });

      return
    }

    mostrarAlerta({})

    try {
      setIsLoading(true);
      await submitEmpleo({ titulo, descripcion, sede, tipo_empleo, salario, estado })


      setTitulo('')
      setDescripcion('')
      setSalario('')
      setTipoEmpleo('')
      setEstado('')
      setSede('')
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);


    }
  }


  const { msg } = alerta
  return (

    <div className="sm:flex sm:flex-row mx-0 ">

      <div className="flex justify-center ">
        <div className="pr-12 pl-12 pt-1 pb-1 bg-white mx-auto rounded-2xl w-100 ">
          <h2 className="text-xl font-bold py-2 text-orange-700">Registrar Nuevo Empleo</h2>
          <div className="bg-gray-300 w-full h-0.5 mb-5"></div>
          {msg && <Alerta alerta={alerta} />}
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className=" w-80">

              <Input
                color="orange"
                type="text"
                label="Tutilo"
                value={titulo}
                id="titulo"
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

                id="tipo_empleo"
                type="text"
                color="blue"
                label="Tipo de Empleo"
                value={tipo_empleo}
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

            <div>
              <button
                type="submit"
                className="w-full flex justify-center bg-orange-500  hover:bg-orange-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                disabled={isLoading}
              >
                {isLoading && (
                  <div className="">
                    <Spinner />
                  </div>
                )}
                {isLoading ? "" : "Registrar"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>


  )
}

export default RegistrarEmpleo