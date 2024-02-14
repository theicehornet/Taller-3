import CaloriasTotales from "./CaloriasTotales/CaloriasTotales";
import CaloriasDiarias from "./CaloriasDiarias/CaloriasDiarias";
import './AnalisisComida.css'


export default function AnalisisComida({ user, registrosMostrar }) {
    return (
        <div id="Informe" className="Analisis-Comida">
                <CaloriasTotales registrosMostrar={registrosMostrar}  />
                <CaloriasDiarias registrosMostrar={registrosMostrar} caloriasDiarias={user.caloriasDiarias} />
            </div>
    )
}