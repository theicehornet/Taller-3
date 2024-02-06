import SelectComidas from "./SelectComidas/SelectComidas";
import useRegisterComidaForm from '../../hooks/useRegisterComidaForm'
import fetchAlimentos from '../../Services/Comidas'
import { useCallback, useEffect, useState, useContext } from "react";
import { UserContext } from "../../Context/user";

export default function FormRegistroComida() {
    const [comidas, setComidas] = useState([])
    const [errorComidas, setErrorComidas] = useState(null)
    const { user } = useContext(UserContext)
    const { error, sendRegisterComida, validateForm, registroEnviado } = useRegisterComidaForm()

    const alimentos = useCallback(async () => {
        
        try {
            const alimentos = await fetchAlimentos(user);
            setComidas(alimentos);
        }
        catch (err) {
                setErrorComidas(err.message);
        }
    }, [user])

    useEffect(() => {
        alimentos();
    }, [alimentos])


    const handleSubmitRegistroComida = (event) => {
        event.preventDefault();
        const fields = new window.FormData(event.target);
        const plato = {
            "idAlimento": parseInt(fields.get("idComida")),
            "cantidad": 450,
            "fecha": fields.get("fechaConsumo")
        }
        if (validateForm(plato)) {
            sendRegisterComida(plato)

        }
    }
    
    return (
        <>
            {
                user.apiKey ?
                    <>
                        <h1>Registro de Comidas</h1>
                        <p>Llene el formulario para llevar un registro de sus comidas</p>
                        <form method="POST" onSubmit={handleSubmitRegistroComida}>
                            <label htmlFor="comidas">Ingrese el plato que ha consumido:</label>
                            {
                                <SelectComidas comidas={comidas} />
                            }
                            <label htmlFor="fechaConsumo">Ingrese la fecha del registro</label>
                            <input type="date" id="fechaConsumo" name="fechaConsumo" />

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