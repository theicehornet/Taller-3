import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoggedIn } from '../app/slices/userSlice';


export function useRegisterForm() {
    const [error, setError] = useState(null);
    
    const dispatcher = useDispatch()
    const sendRegister = async ({ userName, passw, codpais, caloriasmax }) => {
        try {
            const response = await fetch("https://calcount.develotion.com/usuarios.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "usuario": userName,
                    "password": passw,
                    "idPais": codpais,
                    "caloriasDiarias": caloriasmax
                })
            });
            if (!response.ok) {
                throw new Error({
                    code: response.code,
                    message:"Ha ocurrido un error al registrarse",
                })
            }
            const data = await response.json();
            dispatcher(LoggedIn(data))
            localStorage.setItem("userData", JSON.stringify(data));
            console.log(data);
        } catch (err) {
            setError(err.message);
        }
    }

    const validateForm = (data) => {
        const { userName, passw, codpais, caloriasmax } = data;
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
        if (isNaN(codpais)) {
            setError("Seleccione un país");
            return false;
        }
        if (isNaN(caloriasmax)) {
            setError("Ingrese la cantidad de calorias diarias a consumir");
            return false;
        }
        if (caloriasmax < 150 || caloriasmax > 5500) {
            setError("Las calorias diarias deben ser entre 150 y 5500 calorias");
            return false;
        }
        return true;
    }

    return { error, sendRegister, validateForm };
}