import SelectComidas from "./SelectComidas/SelectComidas";
import useRegisterComidaForm from '../../hooks/useRegisterComidaForm'
import { useState } from "react";



export default function FormRegistroComida() {
    const { error, sendRegisterComida, validateForm, registroEnviado, comidas, errorComidas, user } = useRegisterComidaForm()
    const [unidadAConsumir, setUnidadAConsumir] = useState('')

    const handleChange = (event) => {
        const currentIdFood = event.target.value;
        const filterFood = comidas.filter(comida => comida.id == parseInt(currentIdFood))
        if (filterFood.length == 0) {
            setUnidadAConsumir('')
        } else {
            setUnidadAConsumir(filterFood[0].unidad)
        }
    }

    const handleSubmitRegistroComida = (event) => {
        event.preventDefault();
        const fields = new window.FormData(event.target);
        const plato = {
            "idAlimento": parseInt(fields.get("idComida")),
            "cantidad": fields.get("cantidad"),
            "fecha": fields.get("fechaConsumo")
        }
        if (validateForm(plato)) {
            sendRegisterComida(plato)
        }
    }

    return (
        <>
            {
                user != undefined ?
                    <>
                        <h1>Registro de Comidas</h1>
                        <p>Llene el formulario para llevar un registro de sus comidas</p>
                        <form method="POST" onSubmit={handleSubmitRegistroComida}>
                            <label htmlFor="comidas">Ingrese el plato que ha consumido:</label>
                            <SelectComidas comidas={comidas} onChange={handleChange} />
                            <label htmlFor="fechaConsumo">Ingrese la fecha del registro</label>
                            <input type="date" id="fechaConsumo" name="fechaConsumo" />
                            <label htmlFor="cantidadAlimento">Ingrese la cantidad a consumir en({unidadAConsumir}):</label>
                            <input type="text" id="cantidadAlimento" name="cantidad" />
                            <button type="submit" id="btn_registro">Registrar Comida</button>
                        </form>
                    </>
                    :
                    <p>Usted no se encuentra logueado</p>
            }
            {
                registroEnviado && <p>Se ha enviado el registro</p>
            }
            {
                error && <p>{error}</p>
            }
            {
                errorComidas && <p>{errorComidas}</p>
            }
        </>
    )
}