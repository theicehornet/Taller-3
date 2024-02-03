import { useState } from 'react';
export function useRegisterForm() {
    const [error, setError] = useState(null);

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
            const data = await response.json();
            localStorage.setItem("userData", JSON.stringify(data));
            console.log(data);
        } catch (err) {
            setError(err.message);
        }
    }

    const validateForm = (data) => {
        const { userName, passw, passwconfirm, codpais, caloriasmax } = data;
        if (userName.trim().length < 3) {
            setError("El usuario no puede ser vac�o y debe tener al menos tres caracteres");
            return false;
        }
        if (passw.trim() === "") {
            setError("La contrase�a no puede estar vac�a");
            return false;
        }
        if (passw.length !== 8) {
            setError("La contrase�a debe tener ocho caracteres");
            return false;
        }
        if (passw !== passwconfirm) {
            setError("La contrase�a debe ser igual a la confirmaci�n");
            return false;
        }
        if (isNaN(codpais)) {
            setError("Seleccione un pa�s");
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