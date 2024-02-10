import { useListaRegistro } from "../../hooks/useMostrarRegistros";
import MapaUsuarios from "./MapaUsuarios/MapaUsuarios";
import RenderGraficoCaloriasFecha from './RenderGraficoCaloriasFecha/RenderGraficoCaloriasFecha'
import RenderGraficoCantidades from './RenderGraficoCantidades/RenderGraficoCantidades'
import TiempoRestante from "./TiempoRestante/TiempoRestante";




export default function InformeCalorias() {
    const { user, registrosMostrar } = useListaRegistro()
    const CantidadVecesConsumidoAlimento = () => {
        const listdev = [];
        registrosMostrar.forEach(registro => {
            let index = listdev.findIndex(obj => obj.idAlimento === registro.idAlimento);
            if (index != -1) {
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
            <h2>Tiempo Restante</h2>
            <TiempoRestante/>
            <h2>Grafico de cantidades</h2>
            <RenderGraficoCantidades data={CantidadVecesConsumidoAlimento()} />
            <h2>Grafico de Calorias</h2>
            <RenderGraficoCaloriasFecha registros={registrosMostrar} />
            <h2>Mapa de Usuarios por Pais</h2>
            <MapaUsuarios/>
        </>
            :
            <p>Usted no se encuentra logueado!</p>
    )
}