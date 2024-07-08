import { AuthProvider } from './context/AuthProvider'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { SedesProvider } from './context/SedesProvider'
import AuthLayout from "./layouts/AuthLayout"
import AuthLayoutLogin from "./layouts/AuthLayoutLogin"
import AuthLayoutLoginAdmin from "./layouts/AuthLayoutLoginAdmin"
import RutaProtegida from "./layouts/RutaProtegida"
import RutaProtegidaCliente from "./layouts/RutaProtegidaCliente"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import ConfirmarCuentaAdmin from "./paginas/ConfirmarCuentaAdmin"
import IniciarSesion from "./paginas/IniciarSesion"
import IniciarSesionAdmin from "./paginas/IniciarSesionAdmin"
import Inicio from "./paginas/Inicio"
import NuevoPassword from "./paginas/NuevoPassword"
import NuevoPasswordAdmin from "./paginas/NuevoPasswordAdmin"
import OlvidePassword from "./paginas/OlvidePassword"
import OlvidePasswordAdmin from "./paginas/OlvidePasswordAdmin"
import Registrar from "./paginas/Registrar"
import PanelAdmin from "./paginas/admin/PanelAdmin"
import PanelCliente from "./paginas/cliente/PanelCliente"
import Perfil from './components/panel_cliente/Perfil'
import NotFound from './components/NotFound'
import SedesAd from './components/panel_admin/SedesAd'
import { EmpleosProvider } from './context/EmpleosProvider'
import Empleos from './components/panel_admin/Empleos'
import Postulantes from './components/panel_admin/Postulantes'



function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
          
            <SedesProvider>
            <EmpleosProvider>
              <Routes>
                <Route path='/' element={<AuthLayout />}>
                  <Route index element={<Inicio />} />


                </Route>

                <Route path='/login' element={<AuthLayoutLogin />}>
                  <Route index element={<IniciarSesion />} />
                  <Route path="registrar" element={<Registrar />} />
                  <Route path="olvide-password" element={<OlvidePassword />} />
                  <Route path="olvide-password/:token" element={<NuevoPassword />} />
                  <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
                </Route>

                <Route path='/adminlogin' element={<AuthLayoutLoginAdmin />}>
                  <Route index element={<IniciarSesionAdmin />} />

                  <Route path="olvide-password" element={<OlvidePasswordAdmin />} />
                  <Route path="olvide-password/:token" element={<NuevoPasswordAdmin />} />
                  <Route path="confirmar/:id" element={<ConfirmarCuentaAdmin />} />
                </Route>

                <Route path="/cliente" element={<RutaProtegidaCliente />}>
                  <Route index element={<PanelCliente />} />
                  <Route path="perfil" element={<Perfil />} />
                </Route>


                <Route path="/panel-admin" element={<RutaProtegida />}>
                  <Route index element={<PanelAdmin />} />
                  <Route path="sedes" element={<SedesAd />} />
                  <Route path="empleos" element={<Empleos />} />
                  <Route path="postulantes" element={<Postulantes />} />

                </Route>

                {/* Ruta comodín para manejar 404 */}
                <Route path="*" element={<NotFound />} />

              </Routes>
              </EmpleosProvider>
            </SedesProvider>
        
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
