import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const AuthLayout = () => {
    return (
        <>
            <main className="bg-orange-50">
                <Header />
                <Outlet />
                <Footer />
            </main>

        </>

    )
}

export default AuthLayout