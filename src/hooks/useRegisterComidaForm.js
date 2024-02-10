import { useState, useContext, useEffect, useCallback } from 'react';
import { UserContext } from "../Context/user";
import fetchAlimentos from '../Services/Comidas';

export default function useRegisterComidaForm() {
    const [comidas, setComidas] = useState([])
    const [errorComidas, setErrorComidas] = useState(null)
    const [error, setError] = useState(null);
    const [registroEnviado, setRegistroEnviado] = useState(false);
    const { user } = useContext(UserContext)
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
    
    const validateForm = ({ idAlimento, cantidad, fecha }) => {
        const fechapartida = fecha.split("-");
        const d = new Date();
        setRegistroEnviado(false)
        if (fecha === "") {
            setError("Seleccione una fecha")
            return false;
        }
        if (fechapartida[2] > d.getDate() && fechapartida[1] >= d.getMonth()+1) {
            setError("No puede seleccionar una fecha posterior a la de hoy");
            return false;
        }
        if (isNaN(idAlimento)) {
            setError("Hubo un error al seleccionar un alimento");
            return false;
        }
        if (cantidad <= 0) {
            setError("Hubo un error al escoger un alimento");
            return false;
        }
        return true;
    }

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


    return { error, sendRegisterComida, validateForm, registroEnviado, comidas, errorComidas,user }
}