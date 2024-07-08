
import "../../styles/PanelCliente/SpinerPage.css"
import logofastfood from "../../assets/logo-fast-food.png"

const SpinerPage = () => {
    return (

        <div className="flex justify-center items-center flex-col top-40 gap-3">
            <div>
                <img src={logofastfood} alt="Logo FastFood" width="120" height="100" />
            </div>
            <div className="spinner-login-page"></div>
        </div>

    )
}

export default SpinerPage