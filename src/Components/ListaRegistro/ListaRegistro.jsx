import { useEffect, useRef } from 'react';
import { useListaRegistro } from '../../hooks/useMostrarRegistros';
import './listaRegistros.css'
import fetchEliminarRegistro from '../../Services/fetchEliminarRegistro'
import { useState } from 'react';

const ENDPOINT_IMAGES = `https://calcount.develotion.com/imgs/`;

function UrlImage(idimage) {
    return ENDPOINT_IMAGES + idimage + ".png";
}

export default function ListaRegistro() {
    const { user, error, registrosMostrar, setRegistrosMostrar, setError } = useListaRegistro();
    const [registrosFiltro, setRegistroFiltro] = useState([]);
    const selectFiltro = useRef();
    function handleFiltroChange() {
        const currentFiltro = selectFiltro.current.value;
        if (currentFiltro == "0") {
            setRegistroFiltro(registrosMostrar)
        }
        else if (currentFiltro == "1") {
            //TODO FILTRO DE SEMANA
            console.log("soy de la semana")
        } else {
            //TODO FILTRO DE MES
            console.log("soy del mes")
        }
    }

    async function eliminarRegistro(event) {
        event.preventDefault();
        const data = new window.FormData(event.target)
        const idRegistroEliminar = data.get("idRegistro");
        try {
            fetchEliminarRegistro(user, idRegistroEliminar )
            let newregistros = [...registrosMostrar]
            setRegistrosMostrar(newregistros.filter(registro => registro.id != idRegistroEliminar))
            setRegistroFiltro(newregistros.filter(registro => registro.id != idRegistroEliminar))
        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        setRegistroFiltro(registrosMostrar)
    }, [registrosMostrar])
    

    return (
        <>
            <h2>Registros Alimenticios</h2>
            <h3>Estos son sus registros hasta el momento</h3>
            <label htmlFor="filtrarRegistro">Filtre sus registros:</label>
            <select ref={selectFiltro} onChange={handleFiltroChange} id="filtrarRegistro" name="filtrarRegistro">
                <option value="0">Todos los registros</option>
                <option value="1">Ultima Semana</option>
                <option value="2">Ultimo mes</option>
            </select>
            {
                user != undefined ? registrosFiltro.length == 0 ? <p>Por ahora no tiene ningun registro</p> :
                    (<ul className="lista-registros">
                        {
                            registrosFiltro.map(registro => (
                                    <li key={registro.id}>
                                        <form onSubmit={eliminarRegistro}>
                                            <img src={UrlImage(registro.idImagenAlimento)} />
                                            <p>{registro.nombreAlimento}</p>
                                            <p>{registro.cantidad}{registro.unidadAlimento}</p>
                                            <p>{registro.fecha}</p>
                                            <input type="hidden" name="idRegistro" value={registro.id} />
                                            <button>Eliminar</button>
                                        </form>
                                    </li>
                                ))
                        }
                    </ul>)
                    : <p>Usted no se encuentra logueado.</p>
            }
            {error && <p>{error}</p>}
        </>
    )
}