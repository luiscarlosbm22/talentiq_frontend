import { useContext } from "react";
import EmpleosContext from "../context/EmpleosProvider";

const useEmpleos = () => {
    return useContext(EmpleosContext)
}

export default useEmpleos