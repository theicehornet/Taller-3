import CaloriasTotales from "./CaloriasTotales/CaloriasTotales";
import CaloriasDiarias from "./CaloriasDiarias/CaloriasDiarias";
import './AnalisisComida.css'


export default function AnalisisComida({ user, registrosMostrar }) {
    return (
        <section id="Informe" className="Analisis-Comida">
            <div>
                <h2>Informe de calorias</h2>
            </div>
            <div className="">
                <CaloriasTotales registrosMostrar={registrosMostrar}  />
                <CaloriasDiarias registrosMostrar={registrosMostrar} caloriasDiarias={user.caloriasDiarias} />
            </div>
        </section>
    )
}