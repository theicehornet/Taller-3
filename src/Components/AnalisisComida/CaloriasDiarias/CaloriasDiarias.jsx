import { useEffect, useState } from "react";
export default function CaloriasDiarias({ registrosMostrar, caloriasDiarias }) {
    const [reload, setReload] = useState(false)
    const [caloriasTotales, setCaloriasTotales] = useState(0);
    const [style, setStyle] = useState('Good')
    useEffect(() => {
        let calorias = 0;
        registrosMostrar.forEach(registro => {
            let regisFecha = registro.fecha.split("-");

            var fechaActual = new Date();
            var dia = fechaActual.getDate();
            var mes = fechaActual.getMonth() + 1; 
            var anio = fechaActual.getFullYear();
            if (anio == regisFecha[0] && dia == regisFecha[2] && mes == regisFecha[1]) {
                calorias += (registro.cantidad * registro.calorias) / parseInt(registro.porcion);
            }
            setReload(true)
        })
        if (calorias > caloriasDiarias) {
            setStyle("Bad");
        } else if (caloriasDiarias >= calorias && caloriasDiarias * 0.9 <= calorias) {
            setStyle("AlmostBad")
        }
        setCaloriasTotales(calorias);
    }, [registrosMostrar, caloriasDiarias])


    return (reload ? <p >Las calorias diarias consumidas hoy son: <span className={style}>{caloriasTotales}</span></p> : <p>Cargando...</p>)
}