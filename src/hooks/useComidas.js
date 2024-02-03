import { useState, useEffect } from 'react';

export default function useFetchPaises() {
    const [comidas, setComidas] = useState([]);
    const [errorc, setErrorc] = useState('');
    const userData = localStorage.getItem("userData")
    useEffect(() => {
        const fetchPaises = async () => {
            try {
                const response = await fetch("https://calcount.develotion.com/alimentos.php", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": userData.apiKey,
                        "iduser": userData.id,
                    }
                });
                if (!response.ok) {
                    throw new Error("Hubo un error al conseguir las comidas")
                }
                const jsonData = await response.json();
                
                setComidas(jsonData.alimentos);
            } catch (error) {
                setErrorc('Error al recuperar los datos');
            }
        };

        fetchPaises();
    }, []);

    return { comidas, errorc };
}