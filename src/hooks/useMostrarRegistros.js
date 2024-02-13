import { useEffect, useMemo, useState } from "react"
import fetchAlimentos from '../Services/comidas'
import fetchRegistros from '../Services/registros'
import { useSelector } from "react-redux";
export function useListaRegistro() {
    const [error, setError] = useState();
    const [registrosMostrar, setRegistrosMostrar] = useState([]);
    const user = useSelector((store) => store.userSlice.userLogged)
    
    //En vez de useMemo se podria usar useCallback
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
                            "caloriasConsumida": (registro.cantidad * comida.calorias) / parseInt(comida.porcion),
                            "calorias": comida.calorias,
                            "nombreAlimento": comida.nombre,
                            "porcion": comida.porcion,
                            "unidadAlimento": comida.porcion.charAt(comida.porcion.length - 1),
                            "idImagenAlimento": comida.imagen
                        };
                        RegistroMostrarMapped.push(objret);
                    }
                });
                getSortedRegisters(RegistroMostrarMapped);
                setRegistrosMostrar(RegistroMostrarMapped);
            } catch (err) {
                setError(err.message);
            }
        }

    }, [user]);

    useEffect(() => { getMostrarRegistros(); }, [getMostrarRegistros])

    const getSortedRegisters = (registros) => {
        return registros.sort((a, b) => {
            const fecha1 = new Date(a.fecha);
            const fecha2 = new Date(b.fecha);
            if (fecha1 < fecha2) {
                return 1;
            } else if (fecha1 > fecha2) {
                return -1;
            }
            return 0;
        })
    }

    return { user, error, registrosMostrar, setRegistrosMostrar, getMostrarRegistros, setError }
}