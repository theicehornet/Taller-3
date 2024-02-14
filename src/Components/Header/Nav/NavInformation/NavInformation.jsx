import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LoggedOut } from '../../../../app/slices/userSlice'


function SessionActiva({ fun } ) {

    return (
        <>
            <ul className="List-Session">
                <li>
                    <Link to={"/Dashboard"}>Dashboard</Link>
                </li>
                <li>
                    <Link to={"/"}>Inicio</Link>
                </li>
            </ul>
            <ul className="CerrarSession">
                <li>
                    <Link to={"/"} onClick={fun}>Cerrar Session</Link>
                </li>
            </ul>
        </>
    )
}

function SessionNoActiva() {

    return (
        <ul className="List-No-Session">
            <li>
                <Link to={"/InicioSession"} >Iniciar Session</Link>
            </li>
            <li>
                <Link to={"/RegistroUsuario"}>Registrarse</Link>
            </li>
        </ul>
    )
}


export default function NavInformation() {
    const userSession = useSelector((store) => store.userSlice.userLogged)
    const dispatcher = useDispatch()

    const handleClickCerrarSession = () => {
        dispatcher(LoggedOut())
    }
    return (
        <>
            {
                userSession != null ? 
                    <SessionActiva fun={handleClickCerrarSession} />
                    :
                    <SessionNoActiva/>
            }
        </>
    )
}