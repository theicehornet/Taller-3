import { useEffect, useState } from "react";

export default function CaloriasTotales({ registrosMostrar }) {
    const [reload, setReload] = useState(false)
    const [caloriasTotales, setCaloriasTotales] = useState(0);
    useEffect(() => {
        let calorias = 0;
        registrosMostrar.forEach(registro => {
            calorias += (registro.cantidad * registro.calorias) / parseInt(registro.porcion);
            setReload(true)
        })
        setCaloriasTotales(calorias);
    }, [registrosMostrar])
    

    return (reload ? <p>Las calorias totales son: {caloriasTotales}</p>: <p>Cargando...</p>)
}