import CaloriasTotales from "./CaloriasTotales/CaloriasTotales";
import CaloriasDiarias from "./CaloriasDiarias/CaloriasDiarias";
import { useListaRegistro } from "../../hooks/useMostrarRegistros";
import './AnalisisComida.css'


export default function AnalisisComida() {
    const { user, registrosMostrar } = useListaRegistro()


    return (
        user != undefined ?
            <div className="Analisis-Comida">
                <CaloriasTotales registrosMostrar={registrosMostrar}  />
                <CaloriasDiarias registrosMostrar={registrosMostrar} caloriasDiarias={user.caloriasDiarias} />
            </div>
            :
            <p>Usted no se encuentra logueado!</p>
    )
}