import { useEffect, useMemo, useState, useContext } from "react"
import fetchAlimentos from '../Services/comidas'
import fetchRegistros from '../Services/registros'
import { UserContext } from "../Context/user";
export function useListaRegistro() {
    const [error, setError] = useState();
    const [registrosMostrar, setRegistrosMostrar] = useState([]);
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
                            "calorias": comida.calorias,
                            "nombreAlimento": comida.nombre,
                            "porcion": comida.porcion,
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

    return { user, error, registrosMostrar, setRegistrosMostrar, getMostrarRegistros, setError }
}