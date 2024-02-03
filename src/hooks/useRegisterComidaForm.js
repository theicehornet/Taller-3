import { useState } from 'react';
export default function useRegisterComidaForm() {
    const [error, setError] = useState(null);
    const userData = localStorage.getItem("userData");
    const sendRegisterComida = async ({ idAlimento, idUsuario, cantidad, fecha }) => {
        try {
            const response = await fetch("https://calcount.develotion.com/registros.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": userData.apiKey,
                    "iduser": userData.id
                },
                body: JSON.stringify({
                    "idAlimento": idAlimento,
                    "idUsuario": idUsuario,
                    "cantidad": cantidad,
                    "fecha": fecha
                })
            });
            const data = await response.json();
            localStorage.setItem("userData", JSON.stringify(data));
        } catch (err) {
            setError(err.message);
        }
    }

    const validateForm = ({ idAlimento, idUsuario, cantidad, fecha }) => {
        const fechapartida = fecha.split("-");
        const d = new Date();
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
        if (isNaN(idUsuario)) {
            setError("Al parecer no esta logueado,prueb logueandose");
            return false;
        }
        if (cantidad > 0) {
            setError("Hubo un error al escoger un alimento");
            return false;
        }
        
        return true;
    }


    return { error, sendRegisterComida, validateForm }
}