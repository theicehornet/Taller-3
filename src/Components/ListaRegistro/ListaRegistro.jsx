import { useEffect, useMemo, useState  } from "react"
import fetchAlimentos from '../../Services/comidas'
import fetchRegistros from '../../Services/registros'

const ENDPOINT_IMAGES = `https://calcount.develotion.com/imgs/`;



//TODO: SEPARAR LA LOGICA EN OTRO HOOK Y COMPONENTES...


function UrlImage(idimage) {
    return ENDPOINT_IMAGES + idimage + ".png";
}


export default function ListaRegistro() {
    const [error, setError] = useState();
    const [registrosMostrar, setRegistrosMostrar] = useState();
    const userData = localStorage.getItem("userData");
    const getMostrarRegistros = useMemo(() => {
        return async () => {
            try {
                const regis = await fetchRegistros({ userData });
                const alimentos = await fetchAlimentos({userData});
                const RegistroMostrarMapped = [];

                regis.forEach(registro => {
                    const comida = alimentos.find(comida => comida.id === registro.idAlimento);
                    if (comida) {
                        const objret = {
                            "id": registro.id,
                            "idAlimento": registro.idAlimento,
                            "idUsuario": registro.idUsuario,
                            "cantidad": registro.cantidad,
                            "fecha": registro.fecha,
                            "nombreAlimento": comida.nombre,
                            "unidadAlimento": comida.porcion.charAt(comida.porcion.length - 1),
                            "idImagenAlimento": comida.imagen
                        };
                        RegistroMostrarMapped.push(objret);
                    }
                });
                setRegistrosMostrar(RegistroMostrarMapped);
            } catch (err) {
                console.log(err);
                setError(err);
            }
        }

    }, [userData]);

    useEffect(() => { getMostrarRegistros(); }, [registrosMostrar, getMostrarRegistros])

    useEffect(() => { console.log('holappau') }, [getMostrarRegistros])
    return (
        <>
            <h1>Estos son sus registros hasta el momento</h1>
            <form>
                <label htmlFor="filtrarRegistro">Filtre sus registros:</label>
                <select id="filtrarRegistro" name="filtrarRegistro">
                    <option value="0">Ingresé una opción</option>
                    <option value="1">Ultima Semana</option>
                    <option value="2">Ultimo mes</option>
                    <option value="0">Todo el registro</option>
                </select>
                <button>Buscar</button>
            </form>
            {
                error ? <p>errorsillo jiji</p> :
                    (<ul>
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
                    </ul>)
                }
        </>
    )
}