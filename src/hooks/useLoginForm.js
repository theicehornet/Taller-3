import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoggedIn } from '../app/slices/userSlice';
import { SetAlimentos } from '../app/slices/alimentosSlice';
import fetchAlimentos from '../Services/comidas';
import fetchPaises from '../Services/fetchPaises';
import { SetPaises } from '../app/slices/paisesSlice';

export function useLoginForm() {
    const [error, setError] = useState(null);
    const dispatcher = useDispatch()
    const sendLogin = async ({ userName, passw }) =>
    {
        try {
            const response = await fetch("https://calcount.develotion.com/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "usuario": userName,
                    "password": passw,
                })
            });
            if (!response.ok) {
                throw new Error({ message:"Hubo un problema al enviar sus datos"})
            }
            const data = await response.json();
            const alimentos = await fetchAlimentos(data);
            const paises = await fetchPaises(data);
            dispatcher(LoggedIn(data));
            dispatcher(SetAlimentos(alimentos));
            dispatcher(SetPaises(paises));
            setError(null)
        } catch (err) {
            setError(err.message);
        }
    }

    const validateForm = ({ userName, passw }) => {
        if (userName.trim().length < 3) {
            setError("El usuario no puede ser vacío y debe tener al menos tres caracteres");
            return false;
        }
        if (passw.trim() === "") {
            setError("La contraseña no puede estar vacía");
            return false;
        }
        if (passw.length < 3) {
            setError("La contraseña debe tener al menos tres caracteres");
            return false;
        }
        return true;
    }


    return {error,sendLogin,validateForm}
}