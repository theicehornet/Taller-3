import { Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, BarChart, Legend, Tooltip } from 'recharts';
import useCaloriasFecha from '../../../hooks/useCaloriasFecha';




const RenderGraficoCaloriasFecha = ({ registros }) => {
    //TODO CREAR HOOK DE TODO EL USEEFFECT
    const { data } = useCaloriasFecha({ registros })

    return (<ResponsiveContainer width={1000} height="100%" aspect={2}>
        <BarChart data={data} width={800} height={500} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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