import useEmpleos from "../../hooks/useEmpleos"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const Postulantes = () => {
  const { empleos } = useEmpleos();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmpleo, setSelectedEmpleo] = useState(null);

  const openModal = (empleo) => {
    setSelectedEmpleo(empleo);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
    setSelectedEmpleo(null);
  }

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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Lista de Postulantes
                  </Dialog.Title>
                  <div className="mt-2 overflow-x-auto">
                    {selectedEmpleo && selectedEmpleo.postulantes.length > 0 ? (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nombre
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Calificación
                            </th> */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedEmpleo.postulantes.map((postulante) => (
                            <tr key={postulante._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {postulante.nombres} {postulante.apellidos}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {postulante.email}
                              </td>
                              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                90%
                              </td> */}
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex flex-col gap-1">
                                  <button
                                    onClick={() => window.open(postulante.cv_url, '_blank')}
                                    className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
                                  >
                                    Ver CV
                                  </button>
                                  <button
                                    onClick={() => window.location.href = `mailto:${postulante.email}`}
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                  >
                                    Enviar Email
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-sm text-gray-500">No hay postulantes para este empleo.</p>
                    )}
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className="container my-12 mx-auto px-4 md:px-12">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Elige al mejor Postulante</h3>
        </div>
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {empleos.map((empleo) => (
            <div key={empleo._id} className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
              <article className="overflow-hidden rounded-lg shadow-lg">
                <div className="flex justify-center items-center">
                  <img alt="Placeholder" className="block h-auto w-20" src="https://cdn-icons-png.flaticon.com/512/5191/5191748.png" />
                </div>
                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                  <h1 className="text-lg">
                    <a className="no-underline hover:underline text-black" href="#">
                      {empleo.titulo}
                    </a>
                  </h1>
                  <p className="text-orange-800 text-sm">
                    {empleo.tipo_empleo}
                  </p>
                </header>
                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                  <a className="no-underline hover:underline text-black" href="#">
                    <p className="">Creado el: </p>
                    <p className="text-gray-800 text-sm">
                      {new Date(empleo.createdAt).toLocaleDateString()}
                    </p>
                  </a>
                  <button
                    onClick={() => openModal(empleo)}
                    className="no-underline text-grey-darker bg-green-700 p-2 rounded-lg text-white hover:text-red-dark"
                  >
                    Ver Postulantes
                  </button>
                </footer>
              </article>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Postulantes;
