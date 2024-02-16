import { useEffect, useState } from "react";
export default function CaloriasDiarias({ registrosMostrar, caloriasDiarias }) {
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
                calorias += registro.caloriasConsumida;
            }
        })
        if (calorias > caloriasDiarias) {
            setStyle("Bad");
        } else if (caloriasDiarias >= calorias && caloriasDiarias * 0.9 <= calorias) {
            setStyle("AlmostBad")
        } else {
            setStyle('Good')
        }
        setCaloriasTotales(calorias);
    }, [registrosMostrar, caloriasDiarias])


    return (<p >Las calorias diarias consumidas hoy son: <span className={style}>{caloriasTotales.toFixed(3)}</span>cal</p>)
}