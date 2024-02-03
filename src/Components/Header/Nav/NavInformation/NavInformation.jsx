import { useState } from "react";

function SessionActiva({ fun } ) {

    return (
        <>
            <li>
                <a ><p>Analisis</p></a>
            </li>
            <li>
                <a ><p>Informe</p></a>
            </li>
            <li>
                <a ><p>Listado de Registros</p></a>
            </li>
            <li>
                <a ><p>Agregar Registros</p></a>
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
                <a onClick={fun }><p>Iniciar Session</p></a>
            </li>
            <li>
                <a onClick={fun}><p>Registrarse</p></a>
            </li>
        </>
    )
}


export default function NavInformation() {
    const [userData, setUserData] = useState(localStorage.getItem("userData"))
    const handleClickCerrarSession = () => {
        localStorage.setItem("userData", '')
        setUserData('');
    }
    const handleClickRegistroSession = () => {
        localStorage.setItem("userData", 'Registro')
        setUserData('Registro');
    }
    return (
        <>
            {
                userData ?
                    <SessionActiva fun={handleClickCerrarSession} />
                    :
                    <SessionNoActiva fun={handleClickRegistroSession} />
            }
        </>
    )
}