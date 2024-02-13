import { useEffect, useState } from "react";

export default function CaloriasTotales({ registrosMostrar }) {
    const [caloriasTotales, setCaloriasTotales] = useState(0);
    useEffect(() => {
        let calorias = 0;
        registrosMostrar.forEach(registro => {
            calorias += (registro.cantidad * registro.calorias) / parseInt(registro.porcion);
        })
        setCaloriasTotales(calorias);
    }, [registrosMostrar])
    

    return (<p>Las calorias totales son: {caloriasTotales}</p>)
}