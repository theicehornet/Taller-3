import { useListaRegistro } from '../../hooks/useMostrarRegistros';
import './listaRegistros.css'

const ENDPOINT_IMAGES = `https://calcount.develotion.com/imgs/`;

function UrlImage(idimage) {
    return ENDPOINT_IMAGES + idimage + ".png";
}

export default function ListaRegistro() {
    
    const { user, error, registrosMostrar } = useListaRegistro();
    return (
        <>
            <h1>Estos son sus registros hasta el momento</h1>
            <label htmlFor="filtrarRegistro">Filtre sus registros:</label>
            <select id="filtrarRegistro" name="filtrarRegistro">
                <option value="0">Ingresé una opción</option>
                <option value="1">Ultima Semana</option>
                <option value="2">Ultimo mes</option>
                <option value="0">Todo el registro</option>
            </select>
            {
                user.apiKey ?
                    (<ul className="lista-registros">
                    {
                        registrosMostrar ?
                            registrosMostrar.map(registro => (
                                <li key={registro.id}>
                                    <img src={UrlImage(registro.idImagenAlimento)} />
                                    <p>{registro.nombreAlimento}</p>
                                    <p>{registro.cantidad}{registro.unidadAlimento}</p>
                                    <p>{registro.fecha}</p>
                                    <a ><p>Eliminar Registro</p></a>
                                </li>
                            ))
                            :(<li><p>Cargando ...</p></li>)
                    }
                    </ul>) : <p>Usted no se encuentra logueado.</p>
            }
            {error && <p>{error}</p>}
        </>
    )
}