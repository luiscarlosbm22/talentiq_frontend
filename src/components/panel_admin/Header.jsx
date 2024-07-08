import { Link } from "react-router-dom"
import useSedes from "../../hooks/useSedes"
import useAuth from "../../hooks/useAuth"
import logofastfood from "../../assets/logo-fast-food.png"

const Header = () => {


    const {cerrarSesionProductos} = useSedes()
    const {cerrarSesionAuth} = useAuth()

    const handleCerrarSesion = () => {
      cerrarSesionAuth()
      cerrarSesionProductos()
      localStorage.removeItem('token')
    }

  return (
    <header className="px-4 py-2 bg-white border-b">
        <div className="md:flex md:justify-between">
          <img className="w-24 h-11 font-black text-center" src={logofastfood}/>


          <input
            type="search"
            placeholder="Buscar Proyecto"
            className="rounded-lg lg:W-96 block p-2 border"
          
          />

          <div className="flex items-center gap-4">
              <Link
                to="/panel-admin"
              >Productos</Link>

              <button
                type="button"
                className="text-white text-sm bg-orange-600 p-3 rounded-md uppercase font-bold"
                onClick={handleCerrarSesion}
              >Cerrar Sesión</button>
          </div>
        </div>
    </header>
  )
}

export default Header