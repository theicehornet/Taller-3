import { useState, useContext } from 'react';
import { UserContext } from "../Context/user";
export default function useRegisterComidaForm() {
    const [error, setError] = useState(null);
    const [registroEnviado, setRegistroEnviado] = useState(false);
    const { user } = useContext(UserContext)
    const sendRegisterComida = async ({ idAlimento, cantidad, fecha }) => {
        console.log(user.id)
        console.log(user.apiKey)
        console.log(user)
        console.log(idAlimento)
        console.log(cantidad)
        console.log(typeof fecha)
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
            console.log(response);
            console.log(await response.json())
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
        if (fechapartida[2] > d.getDate() && fechapartida[2] >= d.getMonth()+1) {
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


    return { error, sendRegisterComida, validateForm, registroEnviado }
}