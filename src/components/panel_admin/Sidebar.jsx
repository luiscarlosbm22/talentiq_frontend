import { Link, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import logofastfood from "../../assets/logo-icon.png"
import { useState, useEffect } from "react";
import {
  Squares2X2Icon,
  ArchiveBoxIcon,
  HomeModernIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  PowerIcon, PresentationChartLineIcon, CurrencyDollarIcon, ChevronLeftIcon
} from "@heroicons/react/20/solid";
import useSedes from "../../hooks/useSedes";



const Sidebar = ({ open, setOpen }) => {

  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();



  const Menus = [
    { title: "Dashboard", src: <Squares2X2Icon />, url: "/panel-admin" },
    { title: "Sedes", src: <HomeModernIcon />, url: "/panel-admin/sedes" },
    { title: "Postulantes", src: <UsersIcon />, url: "/panel-admin/postulantes", gap: true },
    { title: "Empleos", src: <ClipboardDocumentListIcon />, url: "/panel-admin/empleos" },

  ];

  const { auth, cerrarSesionAuth } = useAuth()
  const { setSede, setSedes } = useSedes()

  const handleCerrarSesion = () => {
    cerrarSesionAuth()
    setSede({})
    setSedes([])
    //cerrarSesionBlogs()
    localStorage.removeItem('token')
  }

  useEffect(() => {
    const handleResize = () => {
      // Si el ancho de la ventana es menor o igual a 768px (tamaño típico de celular),
      // establece open a false
      if (window.innerWidth <= 768) {
        setOpen(false);
      } else {
        setOpen(true); // Si es mayor que 768px, establece open a true
      }
    };

    // Agregar un listener de evento de redimensionamiento para actualizar open cuando cambie el tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Limpieza del efecto cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Ejecutar este efecto solo una vez al montar el componente

  useEffect(() => {
    // Busca la URL actual en las URLs de los elementos del menú
    const foundIndex = Menus.findIndex(menu => menu.url === location.pathname);
    if (foundIndex !== -1) {
      setSelectedItem(foundIndex);
    } else {
      setSelectedItem(null); // Si no se encuentra la URL, desmarca cualquier elemento seleccionado
    }
  }, [location.pathname, Menus]);


  return (

    <div className="flex fixed">
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-white h-screen p-5  pt-8 relative duration-300`}
      >
        <ChevronLeftIcon
          className={`absolute cursor-pointer -right-3 top-9 w-7 bg-white border-gray-200
           border-2 rounded-full text-orange-700  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={logofastfood}
            className={`cursor-pointer w-14 h-13 duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-black origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            Panel Admin
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={Menu.url} key={index}>
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-200 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} 
                ${index === selectedItem ? "bg-orange-700 text-white hover:bg-orange-700" : "text-gray-900"}
              `}
              >
                <div className="w-5 h-5">{Menu.src}</div>
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
          <div className="pt-10"></div>

          <Link onClick={handleCerrarSesion} className="flex rounded-md p-2 cursor-pointer hover:bg-gray-200 text-gray-900 text-sm items-center  gap-x-4  ">
            <PowerIcon className="w-5 h-5" />
            <h1 className={`${!open && "hidden"} origin-left duration-200`}>Cerrar Sesión</h1>
          </Link>



        </ul>
      </div>

    </div>

  )
}

export default Sidebar