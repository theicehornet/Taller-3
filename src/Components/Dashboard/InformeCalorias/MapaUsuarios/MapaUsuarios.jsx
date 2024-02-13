import geolib from 'geolib'
import fetchUsuariosPorPais from '../../../../Services/fetchUsuariosPorPaises'
import fetchPaises from '../../../../Services/fetchPaises'
import { useEffect, useCallback, useState } from 'react'



export default function MapaUsuarios() {
    const [paises, setPaises] = useState([])
    const [errorPaises, setErrorPaises] = useState('')
    const [usuariosPais, setUsuariosPais] = useState([])
    const [errorUsuariosPais, setErrorUsuariosPais] = useState('')
    /*
    const usuariosPorPais = useCallback(async () => {
        try {
            const paisesfech = await fetchUsuariosPorPais(user);
            setUsuariosPais(paisesfech);
        }
        catch (err) {
            setErrorUsuariosPais(err.message);
        }
    }, [user])
    const paisesfetch = useCallback(async () => {
        try {
            const paisesfech = await fetchPaises();
            setPaises(paisesfech);
        }
        catch (err) {
            setErrorPaises(err.message);
        }
    }, [])

    useEffect(() => {
        usuariosPais();
        paisesfetch();
    }, [paisesfetch, usuariosPais])*/


    return (<p>Hola soy el mapa</p>)
}