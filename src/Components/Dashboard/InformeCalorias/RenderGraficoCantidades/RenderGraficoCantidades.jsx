import { Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, BarChart, Legend, Tooltip } from 'recharts';
const RenderGraficoCantidades = ({ data }) => {
    return (<article id="GraficoCantidades">
        <ResponsiveContainer width={1000} height="100%" aspect={2}>
        <BarChart data={data} width={800} height={500} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDashArray="1 4 2" />
            <XAxis dataKey="nombre" />
            <YAxis dataKey="cantidad" />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#4c8435" />
        </BarChart>
        {data.length == 0 && <p>No hay registros</p>}
        </ResponsiveContainer></article>)
}

export default RenderGraficoCantidades;