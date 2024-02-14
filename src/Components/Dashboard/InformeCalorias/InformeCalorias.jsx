import MapaUsuarios from "./MapaUsuarios/MapaUsuarios";
import RenderGraficoCaloriasFecha from './RenderGraficoCaloriasFecha/RenderGraficoCaloriasFecha'
import RenderGraficoCantidades from './RenderGraficoCantidades/RenderGraficoCantidades'
import TiempoRestante from "./TiempoRestante/TiempoRestante";




export default function InformeCalorias({registrosMostrar }) {
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

    return ( <section id="Informes">
            <h2>Informes</h2>
            <h3>Tiempo Restante</h3>
            <TiempoRestante/>
            <h3>Grafico de cantidades</h3>
            <RenderGraficoCantidades data={CantidadVecesConsumidoAlimento()} />
            <h3>Grafico de Calorias</h3>
            <RenderGraficoCaloriasFecha registros={registrosMostrar} />
            <h3>Mapa de Usuarios por Pais</h3>
            <MapaUsuarios/>
        </section>
    )
}