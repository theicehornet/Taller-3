import SelectComidas from "./SelectComidas/SelectComidas";
import useRegisterComidaForm from '../../hooks/useRegisterComidaForm'
import fetchAlimentos from '../../Services/Comidas'
import { useCallback, useEffect, useState } from "react";

export default function FormRegistroComida() {
    const [comidas, setComidas] = useState([])
    const [errorComidas, setErrorComidas] = useState('')
    const [dataUser, setDataUser] = useState(JSON.parse(localStorage.getItem("userData")))
    const { error, sendRegisterComida, validateForm } = useRegisterComidaForm()

    const alimentos = useCallback(async () => {
        
        try {
            const alimentos = await fetchAlimentos(dataUser);
            setComidas(alimentos);
        }
        catch (err) {
                setErrorComidas(err);
        }
    }, [dataUser])

    useEffect(() => {
        alimentos();
    }, [alimentos])


    const handleSubmitRegistroComida = (event) => {
        event.preventDefault();
        const fields = new window.FormData(event.target);
        const cantidad = comidas.find(comida => comida.id === fields.get("idComida").porcion)
        const plato = {
            "idAlimento": parseInt(fields.get("idComida")),
            "idUsuario": parseInt(fields.get("iduser")),
            "cantidad": cantidad ? cantidad : NaN,
            "fecha": fields.get("fechaConsumo")
        }
        if (validateForm(plato)) {
            sendRegisterComida(plato)
        }
    }

    console.log("render")
    return (
        <>
            {
                dataUser ?
                    <>
                        <h1>Registro de Comidas</h1>
                        <p>Llene el formulario para llevar un registro de sus comidas</p>
                        <form method="POST" onSubmit={handleSubmitRegistroComida}>
                            <label htmlFor="comidas">Ingrese el plato que ha consumido:</label>
                            {
                                <SelectComidas comidas={comidas} />
                            }
                            <input type="hidden" id="iduser" name="iduser" value={dataUser.id} />

                            <label htmlFor="fechaConsumo">Ingrese la fecha del registro</label>
                            <input type="date" id="fechaConsumo" name="fechaConsumo" />

                            <button type="submit" id="btn_registro">Registrar Comida</button>
                        </form>
                    </>
                    :
                    <p>Usted no se encuentra logueado</p>
            }
            {
                error ? <p>{error}</p>:<></>
            }
        </>
    )
}