import useEmpleos from "../../hooks/useEmpleos";
import Alerta from "../../components/Alerta";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import useAuth from "../../hooks/useAuth";
import { uploadFile } from "../../firebase/config";
import { toast } from "react-toastify"

const ListaEmpleos = () => {
  const { empleosPublic, postularEmpleo,mostrarAlerta, alerta } = useEmpleos();
  const { auth } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmpleo, setSelectedEmpleo] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(empleo) {
    setSelectedEmpleo(empleo);
    setIsOpen(true);
  }
  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const extractTextFromPdf = async (file) => {
    const formData = new FormData();
    formData.append('pdfFile', file);

    try {
        const response = await fetch('http://localhost:4000/api/extract-text', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            return data.text;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error extrayendo texto del PDF:', error);
        throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cvFile) {
      alert('Por favor sube tu CV');
      return;
    }

    try {
      // Extraer el texto del PDF
      const cvText = await extractTextFromPdf(cvFile);

      // Subir el archivo a Firebase y obtener la URL
      const cvUrl = await uploadFile(cvFile);

      // Llamar a la función del contexto para postular al empleo
      await postularEmpleo({
        empleoId: selectedEmpleo._id,
        usuarioId: auth._id,
        nombres: auth.nombres,
        apellidos: auth.apellidos,
        email: auth.email,
        cvUrl,
        cvText // Añadir el texto del CV
      });

      toast.success('Postulación Enviada');
      closeModal();
    } catch (error) {
      console.error('Error al postular al empleo:', error);
      mostrarAlerta({
        msg: "Error al postular al empleo",
        error: true
      });
    }
  };

  const { msg } = alerta

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Postularás como {selectedEmpleo?.titulo}
                  </Dialog.Title>
                  {msg && <Alerta alerta={alerta} />}
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {auth.nombres} {auth.apellidos}
                    </p>
                    <p className="text-sm text-gray-500">
                      {auth.email}
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-5">
                        <div>
                          <label
                            className="text-sm"
                            htmlFor="file_input"
                          >
                            Agrega tu CV en PDF
                          </label>
                        </div>
                        <div className="border-2 rounded-lg">
                          <input
                            id="file_input"
                            type="file"
                            onChange={handleFileChange}
                            placeholder="cv en pdf"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Enviar Postulación
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div>
        <div className="flex flex-col justify-center items-center">
          <div>
            <div className="flex flex-col gap-5 pb-20">
              <div>
                <h3 className="text-2xl font-bold text-gray-700">Lista de Empleos</h3>
              </div>
              {empleosPublic.map((empleo, index) => (
                <div key={index} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-3xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div className="flex flex-col justify-center items-center p-5">
                    <img src="https://cdn-icons-png.flaticon.com/512/5191/5191748.png" className="w-20" alt="Icono de trabajo" />
                    
                    <h3 className="text-sm">{empleo.sede}</h3>
                  </div>

                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{empleo.titulo}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{empleo.descripcion}</p>
                    <div className="flex justify-between">
                      <div className="flex gap-3">
                        <p className="text-orange-700">{empleo.tipo_empleo}</p>
                        <p>S/{empleo.salario}</p>
                      </div>
                      <div>
                        <button onClick={() => openModal(empleo)} className="bg-green-700 text-white p-1 rounded-md cursor-pointer hover:bg-green-500">Postular</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListaEmpleos;
