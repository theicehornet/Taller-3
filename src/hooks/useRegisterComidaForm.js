import { useState, useEffect, useCallback } from 'react';
import fetchAlimentos from '../Services/Comidas';
import { useSelector } from "react-redux";

export default function useRegisterComidaForm() {
    const [comidas, setComidas] = useState([])
    const [errorComidas, setErrorComidas] = useState(null)
    const [error, setError] = useState(null);
    const [registroEnviado, setRegistroEnviado] = useState(false);
    const user = useSelector((store) => store.userSlice.userLogged)
    const alimentosGuardados = useSelector((store) => store.alimentosSlice.alimentosStored)

    const sendRegisterComida = async ({ idAlimento, cantidad, fecha }) => {
        try {
            const response = await fetch("https://calcount.develotion.com/registros.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": user.apiKey,
                    "iduser": user.id
                },
                body: JSON.stringify({
                    "idAlimento": idAlimento,
                    "idUsuario": user.id,
                    "cantidad": cantidad,
                    "fecha": fecha
                })
            });
            if (!response.ok) {
                throw new Error("Hubo un error")
            }
            setError('')
            setRegistroEnviado(true)
        } catch (err) {
            setRegistroEnviado(false)
            setError(err.message);
        }
    }
    const validateForm = ({ idAlimento, cantidad, fecha, unidadConsumida }) => {
        const fechapartida = fecha.split("-");
        const d = new Date();
        setRegistroEnviado(false)
        if (fecha === "") {
            setError("Seleccione una fecha")
            return false;
        }
        if (fechapartida[2] > d.getDate() && fechapartida[1] >= d.getMonth() + 1 && d.getFullYear() >= fechapartida[0]) {
            setError("No puede seleccionar una fecha posterior a la de hoy");
            return false;
        }
        if (isNaN(idAlimento)) {
            setError("Hubo un error al seleccionar un alimento");
            return false;
        }
        if (unidadConsumida !== cantidad.charAt(cantidad.length - 1)) {
            setError("Debe indicar correctamente la unidad a consumir.")
            return false;
        }
        if (parseInt(cantidad) <= 0) {
            setError("La cantidad consumida no puede ser menor o igual a 0");
            return false;
        }
        return true;
    }

    const alimentos = useCallback(async () => {

        try {
            alimentosGuardados.forEach(alimento => alimento.unidad = alimento.porcion.charAt(alimento.porcion.length - 1))
            setComidas(alimentos);
        }
        catch (err) {
            setErrorComidas(err.message);
        }
    }, [alimentosGuardados])

    useEffect(() => {
        alimentos();
    }, [alimentos])


    return { error, sendRegisterComida, validateForm, registroEnviado, comidas, errorComidas,user }
}