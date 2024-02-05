import { useCallback, useState,useEffect } from 'react';
import fetchPaises from '../../../Services/fetchPaises'

export default function SelectPaises() {
    const [paises, setPaises] = useState([])
    const getPaises = useCallback(async () => {
        try {
            const paises = await fetchPaises();
            setPaises(paises);
        }
        catch (err) {
            console.log(err);
        }
    }, [])

    useEffect(() => {
        getPaises();
    }, [getPaises])

    return (
        <select id="paises" name="paises">
            <option value="">Seleccione...</option>
            {
                paises ? paises.map(pais =>
                    <option key={pais.id} value={pais.id}>{pais.name}</option>
                )
                    : (<option>Cargando datos ...</option>)
            }
        </select>
    );
}