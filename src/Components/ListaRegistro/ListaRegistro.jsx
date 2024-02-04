import { useEffect, useState } from "react"
import useComidas from '../../hooks/useComidas'
const ENDPOINT_IMAGES = `https://calcount.develotion.com/imgs/`;

export default function ListaRegistro() {
    const { comidas, errorc } = useComidas();
    const [registros, setRegistros] = useState([]);
    const [registrosMostrar, setRegistrosMostrar] = useState()
    const userData = localStorage.getItem("userData")
    useEffect(() => {
        const getRegistros = async () => {
            const response = await fetch(`https://calcount.develotion.com/registros.php?idUsuario=1161`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": "a5c61edd5c386893f9af3ed2cb669eb0",
                    "iduser": "1161",
                },
            })
            const data = await response.json();
            const  registros  = data.registros;
            setRegistros(registros)
        }
        const getMostrarRegistros = async () => {
            await getRegistros();
            const RegistroMostrarMapped = [];
            if (registros.length == 0 || comidas.length == 0) {
                return;
            }
            registros.forEach(registro => {
                const comida = comidas.find(comida => comida.id === registro.idAlimento);
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
        }
        getMostrarRegistros();
    }, [comidas])

    function UrlImage(idimage) {
        return ENDPOINT_IMAGES + idimage + ".png";
    }

    return (
        <>
            <h1>Estos son sus registros hasta el momento</h1>
            <form>
                <label htmlFor="filtrarRegistro">Filtre sus registros:</label>
                <select id="filtrarRegistro" name="filtrarRegistro">
                    <option value="0">Ingrese una opción</option>
                    <option value="1">Ultima Semana</option>
                    <option value="2">Ultimo mes</option>
                    <option value="0">Todo el registro</option>
                </select>
                <button>Buscar</button>
            </form>
            <ul>
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
                        :
                        <p>Cargando...</p>
                }
            </ul>
            {errorc && <p>{errorc}</p>}
        </>
    )
}