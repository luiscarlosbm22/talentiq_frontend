import useEmpleos from "../../../hooks/useEmpleos"
import { useState, useEffect, useRef, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'

import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,


} from "@material-tailwind/react";
import RegistrarEmpleo from "./RegistrarEmpleo";
import FormEditarEmpleo from "./FormEditarEmpleo";

const TABLE_HEAD = ["Titulo", "Sede", "Tipo Empleo", "Salario", "Estado", "Acción"];

// Tamaño de página, es decir, cuántos registros se muestran en una página
const PAGE_SIZE = 8;

const MAX_PAGES_TO_SHOW = 3; // Cantidad máxima de páginas para mostrar

const TableEmpleos = () => {

  const cancelButtonRef = useRef(null)
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [salario, setSalario] = useState('');
  const [tipoEmpleo, setTipoEmpleo] = useState('');
  const [estado, setEstado] = useState('');

  const { empleos, eliminarEmpleo } = useEmpleos();
  const [empleoAEditar, setEmpleoAEditar] = useState(null); // Estado para almacenar los datos del usuario a editar

  // Función para abrir el diálogo de edición con los datos del cliente seleccionado
  const handleEditarEmpleo = (id) => {
    const empleo = empleos.find(empleo => empleo._id === id);
    setEmpleoAEditar(empleo); // Guarda los datos del cliente a editar en el estado
    setOpen2(true); // Abre el diálogo
  };

  // Función para manejar cambios en el campo de búsqueda
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reinicia la página al realizar una búsqueda
  };

  // Actualizar los campos del formulario con los datos del cliente cuando clienteAEditar cambie
  useEffect(() => {
    if (empleoAEditar) {
      setTitulo(empleoAEditar.titulo);
      setDescripcion(empleoAEditar.descripcion);
      setSalario(empleoAEditar.salario);
      setTipoEmpleo(empleoAEditar.tipo_empleo);
      setEstado(empleoAEditar.estado);

    }
  }, [empleoAEditar]);


  const handleDeleteEmpleo = (id) => {
    const empleo = empleos.find(empleo => empleo._id === id);
    setEmpleoAEditar(empleo); // Guarda los datos del cliente a editar en el estado
    setOpenDelete(true); // Abre el diálogo
  };

  const handleEliminarEmpleo = async e => {
    e.preventDefault();

    try {

      await eliminarEmpleo({
        _id: empleoAEditar._id, // Usar _id del cliente
      });

      setOpenDelete(false)


    } catch (error) {

      console.error("Error al editar empleo:", error);

    }
  }

  // Filtrar empleos según el término de búsqueda
  const filteredEmpleos = empleos.filter((empleo) => {
    return (
      empleo.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  // Calcula el índice del primer y último elemento a mostrar en la página actual
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;

  // Ordenar todas las órdenes por fecha de creación (de más reciente a más antigua)
  const allEmpleosOrdenadas = filteredEmpleos
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Filtra los clientes a mostrar en base al número de página
  const empleosPaginados = allEmpleosOrdenadas.slice(startIndex, endIndex);

  // Función para ir a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para ir a la página siguiente
  const goToNextPage = () => {
    const totalPages = Math.ceil(empleos.length / PAGE_SIZE);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para renderizar los botones de página
  const renderPageButtons = () => {
    const totalPages = Math.ceil(empleos.length / PAGE_SIZE);
    const pagesToShow = [];

    let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2));
    let endPage = Math.min(totalPages, startPage + MAX_PAGES_TO_SHOW - 1);

    if (startPage > 1) {
      pagesToShow.push(1);
      if (startPage > 2) {
        pagesToShow.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pagesToShow.push('...');
      }
      pagesToShow.push(totalPages);
    }

    return pagesToShow.map((page, index) => (
      <IconButton
        key={index}
        variant={page === currentPage ? "filled" : "text"}
        size="sm"
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </IconButton>
    ));
  };

  const handleOpen = () => setOpen(!open);



  return (
    <>

      {/* Dialog para Eliminar un Producto */}

      <Transition.Root show={openDelete} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenDelete}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full  items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          ¿Estas Seguro de Eliminar?
                        </Dialog.Title>
                        <div className="flex gap-2">
                          <div>
                            <img className="h-24 w-24 rounded-md" src="https://cdn.icon-icons.com/icons2/2942/PNG/512/work_icon_183913.png" alt={titulo} />
                          </div>
                          <div>
                            <h4 className="text-lg text-gray-800 font-bold">{titulo}</h4>
                            <span className="text-md bg-gray-900 text-white font-bold p-1 rounded-md">{tipoEmpleo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">


                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleEliminarEmpleo}
                    >
                      Confirmar
                    </button>

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpenDelete(false)}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>


                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Dialog para registrar un Producto */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full  items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <RegistrarEmpleo></RegistrarEmpleo>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Dialog para editar un Producto */}
      <Transition.Root show={open2} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen2}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full  items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <FormEditarEmpleo empleo={empleoAEditar} onClose={() => setOpen2(false)} />
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen2(false)}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>



      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lista de Empleos
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Todos los empleos se muestran aquí
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Buscar"
                  color="orange"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Button onClick={handleOpen} className="flex items-center gap-3 bg-orange-700" size="sm" >
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Registrar Nuevo
              </Button>

            </div>
          </div>
        </CardHeader>

        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {empleosPaginados.map(
                (
                  {
                    _id,
                    titulo,
                    tipo_empleo,
                    estado,
                    salario,
                    sede,
                  },
                  index,
                ) => {
                  const isLast = index === empleosPaginados.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (

                    <tr key={_id}>

                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src="https://cdn.icon-icons.com/icons2/2942/PNG/512/work_icon_183913.png"
                            alt={titulo}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {titulo}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <span
                          className="text-sm text-black"
                        >
                          {sede}
                        </span>
                      </td>
                      <td className={classes}>
                        <span
                          className="text-sm text-black"
                        >
                          {tipo_empleo}
                        </span>
                      </td>
                      <td className={classes}>
                        <span
                          className="text-sm text-black"
                        >
                          S/{salario}
                        </span>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {estado}
                        </Typography>
                      </td>

                      <td className={classes}>
                        {/* <Link target="_blank" to={`/panel-admin/editar-trabajador/${_id}`}> */}


                        <Tooltip content="Editar Empleo">
                          <IconButton variant="text" onClick={() => handleEditarEmpleo(_id)}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip content="Eliminar Empleo">
                          <IconButton variant="text" onClick={() => handleDeleteEmpleo(_id)}>
                            <TrashIcon className="h-4 w-4 text-red-700 font-bold" />
                          </IconButton>
                        </Tooltip>



                      </td>
                    </tr>


                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" onClick={goToPreviousPage} size="sm">
            Atras
          </Button>
          <div className="flex items-center gap-2">
            {renderPageButtons()}
          </div>
          <Button variant="outlined" onClick={goToNextPage} size="sm">
            Siguiente
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default TableEmpleos