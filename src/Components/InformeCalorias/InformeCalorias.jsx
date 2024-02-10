import { useListaRegistro } from "../../hooks/useMostrarRegistros";
import { Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, BarChart, Legend, Tooltip } from 'recharts';


const RenderGraficoCantidades = ({ data }) => {
    console.log(data)
    return (<ResponsiveContainer width={800} height="100%" aspect={2}>
        <BarChart data={data} width={700} height={400} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDashArray="1 4 2" />
            <XAxis dataKey="nombre" />
            <YAxis dataKey="cantidad" />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#4c8435" />
        </BarChart>
     </ResponsiveContainer>)
}


export default function InformeCalorias() {
    const { user, registrosMostrar } = useListaRegistro()
    
    const CantidadVecesConsumidoAlimento = () => {
        const listdev = [];
        registrosMostrar.forEach(registro => {
            let index = listdev.findIndex(obj => obj.idAlimento === registro.idAlimento);
            if (index != -1) {
                console.log("llegue aqui")
                listdev[index].cantidad += 1;
            }
            else {
                const newRegistroAnalisis = {
                    idAlimento: registro.idAlimento,
                    nombre: registro.nombreAlimento,
                    cantidad: 1,
                }
                listdev.push(newRegistroAnalisis)
            }
        })
        return listdev;
    }

    return (
        user != undefined ? <>
            <h2>Grafico de cantidades</h2>
            <RenderGraficoCantidades data={CantidadVecesConsumidoAlimento()} />
            <h2>Grafico de Calorias</h2>
        </>
            :
            <p>Usted no se encuentra logueado!</p>
    )
}