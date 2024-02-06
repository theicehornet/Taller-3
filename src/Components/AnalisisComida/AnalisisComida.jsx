import { UserContext } from "../../Context/user";
import { useContext } from "react";
export default function AnalisisComida() {
    const { user } = useContext(UserContext)

    return (
        user.apiKey ? <p>Aqui van los analisis de los registros.</p> :
        <p>Usted no se encuentra logueado!</p>
    )
}