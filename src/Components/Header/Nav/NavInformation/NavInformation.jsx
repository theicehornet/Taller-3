import { useContext } from "react";
import { UserContext } from "../../../../Context/user";
import { Link } from "react-router-dom";

function SessionActiva({ fun } ) {

    return (
        <>
            <ul className="List-Session">
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
                    <Link to={"/"}>Inicio</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to={"/"} onClick={fun}>Cerrar Session</Link>
                </li>
            </ul>
        </>
    )
}

function SessionNoActiva({ fun } ) {

    return (
        <ul className="List-No-Session">
            <li>
                <Link to={"/InicioSession"} onClick={fun}>Iniciar Session</Link>
            </li>
            <li>
                <Link to={"/RegistroUsuario"}>Registrarse</Link>
            </li>
        </ul>
    )
}


export default function NavInformation() {
    const { user, LoggedOut, LoggedIn } = useContext(UserContext)

    const handleClickCerrarSession = () => {
        LoggedOut()
    }

    const handleClickRegistroSession = () => {
        LoggedIn()
    }

    console.log(user)
    return (
        <>
            {
                user != undefined ? 
                    <SessionActiva fun={handleClickCerrarSession} />
                    :
                    <SessionNoActiva fun={handleClickRegistroSession} />
            }
        </>
    )
}