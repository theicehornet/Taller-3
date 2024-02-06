import { useContext } from "react";
import { UserContext } from "../../Context/user";

export default function InformeCalorias() {
    const { user } = useContext(UserContext)

    return (
        user.apiKey ?
            <p>Aqui van el informe de los registros.</p>
            :
            <p>Usted no se encuentra logueado!</p>
    )
}