import { useRef } from 'react';
import { useListaRegistro } from '../../hooks/useMostrarRegistros';
import './listaRegistros.css'
import fetchEliminarRegistro from '../../Services/fetchEliminarRegistro'

const ENDPOINT_IMAGES = `https://calcount.develotion.com/imgs/`;

function UrlImage(idimage) {
    return ENDPOINT_IMAGES + idimage + ".png";
}

export default function ListaRegistro() {
    const { user, error, registrosMostrar, setRegistrosMostrar, setError } = useListaRegistro();
    const selectFiltro = useRef();

    function handleFiltroChange() {
        console.log(selectFiltro.current.value)
    }

    async function  eliminarRegistro(event) {
        event.preventDefault();
        const data = new window.FormData(event.target)
        const idRegistroEliminar = data.get("idRegistro");
        try {
            fetchEliminarRegistro(user, idRegistroEliminar )
            let newregistros = [...registrosMostrar]
            setRegistrosMostrar(newregistros.filter(registro => registro.id != idRegistroEliminar))
        } catch (err) {
            setError(err.message)
        }
    }
    console.log(registrosMostrar)
    return (
        <>
            <h1>Estos son sus registros hasta el momento</h1>
            <label htmlFor="filtrarRegistro">Filtre sus registros:</label>
            <select ref={selectFiltro} onChange={handleFiltroChange} id="filtrarRegistro" name="filtrarRegistro">
                <option value="0">Todos los registros</option>
                <option value="1">Ultima Semana</option>
                <option value="2">Ultimo mes</option>
            </select>
            {
                user != undefined ? registrosMostrar.length == 0 ? <p>Por ahora no tiene ningun registro</p> :
                    (<ul className="lista-registros">
                        {
                                registrosMostrar.map(registro => (
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