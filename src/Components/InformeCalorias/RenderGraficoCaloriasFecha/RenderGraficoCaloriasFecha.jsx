import { useEffect, useState } from "react";
import { Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, BarChart, Legend, Tooltip } from 'recharts';

const RenderGraficoCaloriasFecha = ({ registros }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        const datosSemana = [];
        const d = new Date();
        var dia = d.getDate();
        var mes = d.getMonth() + 1;
        var anio = d.getFullYear();
        const fechasPermitidas = [];
        const mesescon30 = [4, 6, 9, 11]
        const mesescon31 = [1, 3, 5, 7, 8, 10, 12]

        if (mes < 10) {
            if (dia < 10) {
                fechasPermitidas.push(anio + "-" + "0" + mes + "-" + "0" + dia)
            } else {
                fechasPermitidas.push(anio + "-" + "0" + mes + "-" + dia)
            }
        } else {
            if (dia < 10) {
                fechasPermitidas.push(anio + "-" + mes + "-" + "0" + dia)
            } else {
                fechasPermitidas.push(anio + "-" + mes + "-" + dia)
            }
        }
        for (let i = 1; i < 7; i++) {
            dia -= 1;
            if (dia - i == 0 && mes > 1) {

                if (mes == 3) {
                    dia = 28
                    mes = 2
                    fechasPermitidas.push(anio + "-" + "0" + mes + "-" + dia)
                }
                else if (mesescon30.includes(mes)) {
                    dia = 30
                    fechasPermitidas.push(anio + "-" + (mes < 10 ? "0" : "") + (mes - 1) + "-" + dia)
                }
                else if (mesescon31.includes(mes)) {
                    dia = 31
                    fechasPermitidas.push(anio + "-" + (mes < 10 ? "0" : "") + (mes - 1) + "-" + dia)
                }
                mes = mes - 1;
            }
            else if (dia - i == 0 && mes == 1) {
                mes = 12;
                anio = anio - 1;
                dia = 31;
                fechasPermitidas.push(anio.toString() + "-" + (mes < 10 ? "0" : "") + mes.toString() + "-" + (dia < 10 ? "0" : "") + dia.toString())
            } else {
                console.log(dia);
                if (dia < 10 && mes < 10) {
                    fechasPermitidas.push(`${anio}-0${mes}-0${dia}`)
                } else if (dia < 10 && mes >= 10) {
                    fechasPermitidas.push(anio.toString() + "-" + mes + "-" + "0" + dia)
                } else if (mes < 10 && dia >= 10) {
                    fechasPermitidas.push(anio.toString() + "-" + "0" + mes + "-" + dia)
                }
            }
            
        }
        console.log(fechasPermitidas);
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
    }, [registros])

    return (<ResponsiveContainer width={900} height="100%" aspect={2}>
        <BarChart data={data} width={700} height={400} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDashArray="1 4 2" />
            <XAxis dataKey="fecha" />
            <YAxis dataKey="calorias" />
            <Tooltip />
            <Legend />
            <Bar dataKey="calorias" fill="#4c8435" />
        </BarChart>
    </ResponsiveContainer>)
}

export default RenderGraficoCaloriasFecha;