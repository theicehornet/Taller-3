import { useState,useEffect } from "react";


export default function useCaloriasFecha({ registros, cantDias=7 }) {
    const [data, setData] = useState([])
    const [fechasDebidas, setFechasPermitidas] = useState([])
    useEffect(() => {
        const datosSemana = [];
        const d = new Date();
        let dia = d.getDate();
        let mes = d.getMonth() + 1;
        let anio = d.getFullYear();
        const fechasPermitidas = [];
        const mesescon30 = [4, 6, 9, 11];
        const mesescon31 = [1, 3, 5, 7, 8, 10, 12];

        const formatoFecha = (anio, mes, dia) => {
            return `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
        };

        fechasPermitidas.push(formatoFecha(anio, mes, dia));

        for (let i = 1; i < cantDias; i++) {
            dia -= 1;
            if (dia === 0 && mes > 1) {
                if (mes === 3) {
                    dia = 28;
                    mes = 2;
                } else if (mesescon30.includes(mes)) {
                    dia = 30;
                } else if (mesescon31.includes(mes)) {
                    dia = 31;
                }
                mes -= 1;
                fechasPermitidas.push(formatoFecha(anio, mes, dia));
            } else if (dia === 0 && mes === 1) {
                mes = 12;
                anio -= 1;
                dia = 31;
                fechasPermitidas.push(formatoFecha(anio, mes, dia));
            } else {
                fechasPermitidas.push(formatoFecha(anio, mes, dia));
            }
        }

        setFechasPermitidas(fechasPermitidas)
        fechasPermitidas.forEach(fecha => {
            datosSemana.push({ fecha: fecha, calorias: 0 })
        })
        registros.forEach(registro => {

            if (fechasPermitidas.indexOf(registro.fecha) != -1) {
                const indexBuscado = datosSemana.findIndex(obj => obj.fecha == registro.fecha);
                if (indexBuscado != -1) {
                    datosSemana[indexBuscado].calorias += registro.caloriasConsumida
                } else {
                    datosSemana.push({ fecha: registro.fecha, calorias: registro.caloriasConsumida })
                }
            }
        })
        setData(datosSemana);
    }, [registros, cantDias])

    return { data, fechasDebidas };
}