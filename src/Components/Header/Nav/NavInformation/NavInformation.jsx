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
    const [data, setData] = useState(localStorage.getItem("userData"));
    const handleClickCerrarSession = () => {
        localStorage.setItem("userData", null)
        setData(null)
    }
    const handleClickRegistroSession = () => {
        localStorage.setItem("userData", JSON.stringify({ "apiKey": "a5c61edd5c386893f9af3ed2cb669eb0", "id": 1161, "caloriasDiarias": 2000 }))
        setData(localStorage.getItem("userData"))
    }
    return (
        <>
            {
                data ?
                    <SessionActiva fun={handleClickCerrarSession} />
                    :
                    <SessionNoActiva fun={handleClickRegistroSession} />
            }
        </>
    )
}