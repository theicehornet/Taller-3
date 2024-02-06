import { useEffect, useMemo, useState,useContext  } from "react"
import fetchAlimentos from '../../Services/comidas'
import fetchRegistros from '../../Services/registros'
import { UserContext } from "../../Context/user";
import './listaRegistros.css'


const ENDPOINT_IMAGES = `https://calcount.develotion.com/imgs/`;



//TODO: SEPARAR LA LOGICA EN OTRO HOOK Y COMPONENTES...


function UrlImage(idimage) {
    return ENDPOINT_IMAGES + idimage + ".png";
}


export default function ListaRegistro() {
    const [error, setError] = useState();
    const [registrosMostrar, setRegistrosMostrar] = useState();
    const { user } = useContext(UserContext)

    const getMostrarRegistros = useMemo(() => {
        return async () => {
            try {
                const regis = await fetchRegistros(user);
                const alimentos = await fetchAlimentos(user);
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
                setError(err.message);
            }
        }

    }, [user]);

    useEffect(() => { getMostrarRegistros(); }, [getMostrarRegistros])
    
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