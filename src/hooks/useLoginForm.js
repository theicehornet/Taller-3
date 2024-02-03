import { useState } from 'react';
export function useLoginForm() {
    const [error, setError] = useState(null);

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
            const data = await response.json();
            localStorage.setItem("userData", JSON.stringify(data));
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
        if (passw.length !== 8) {
            setError("La contraseña debe tener ocho caracteres");
            return false;
        }
        return true;
    }


    return {error,sendLogin,validateForm}
}