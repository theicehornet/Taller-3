import { useState, useEffect } from 'react';

export default function useComidas() {
    const [comidas, setComidas] = useState([]);
    const [errorc, setErrorc] = useState('');
    const userData = localStorage.getItem("userData")
    useEffect(() => {
        const fetchAlimentos = async () => {
            try {
                const response = await fetch("https://calcount.develotion.com/alimentos.php", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": "a5c61edd5c386893f9af3ed2cb669eb0",
                        "iduser": "1161",
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

        fetchAlimentos();
    }, []);
    return { comidas, errorc };
}