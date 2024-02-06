import { useContext } from "react";
import { UserContext } from "../../../../Context/user";
import { Link } from "react-router-dom";

function SessionActiva({ fun } ) {

    return (
        <>
            <li>
                <Link to={"/AnalisisComidas"}>Analisis</Link>
            </li>
            <li>
                <Link to={"/InformeComidas"}>Informe</Link>
            </li>
            <li>
                <Link to={"/RegistrosComidas"}>Listado de Registros</Link>
            </li>
            <li>
                <Link to={"/RegistrarComida"}>Agregar Registros</Link>
            </li>
            <li>
                <a onClick={fun}><p>Cerrar Session</p></a>
            </li>
        </>
    )
}

function SessionNoActiva({ fun } ) {

    return (
        <>
            <li>
                <Link to={"/InicioSession"} onClick={fun}>Iniciar Session</Link>
            </li>
            <li>
                <Link to={"/RegistroUsuario"}>Registrarse</Link>
            </li>
        </>
    )
}


export default function NavInformation() {
    const { user, setUser } = useContext(UserContext)
    const handleClickCerrarSession = () => {
        const dataString = JSON.stringify({ apiKey: '', id: 0, caloriasDiarias: 0 })
        localStorage.setItem("userData", dataString)
        setUser({ apiKey: '', id: 0, caloriasDiarias: 0 })
        console.log("cerrarsession")
    }
    const handleClickRegistroSession = () => {
        localStorage.setItem("userData", JSON.stringify({ "apiKey": "a5c61edd5c386893f9af3ed2cb669eb0", "id": 1161, "caloriasDiarias": 2000 }))
        setUser(JSON.parse(localStorage.getItem("userData")))
        console.log("abrir")
    }

    console.log(user)
    return (
        <>
            {
                user.apiKey ? 
                    <SessionActiva fun={handleClickCerrarSession} />
                    :
                    <SessionNoActiva fun={handleClickRegistroSession} />
            }
        </>
    )
}